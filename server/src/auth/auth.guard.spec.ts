import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Mock } from 'jest-mock';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() } as any;
    reflector = { getAllAndOverride: jest.fn() } as any;

    guard = new AuthGuard(jwtService, reflector);
    guard.reflector = reflector;
  });

  it('should allow access if route is public', async () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as unknown as ExecutionContext;

    expect(await guard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException if no token', async () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should validate JWT token and attach payload', async () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
    (jwtService.verifyAsync as jest.Mock).mockResolvedValue({
      sub: 1,
      username: 'john',
    });

    const request = { headers: { authorization: 'Bearer token123' } };
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
    expect(request['user']).toEqual({ sub: 1, username: 'john' });
  });
});
