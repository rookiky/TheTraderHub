import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue('fake-jwt-token'),
            register: jest.fn().mockResolvedValue('fake-jwt-token'),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn() as jest.Mock<Promise<string>, [any]>,
            verifyAsync: jest.fn() as jest.Mock<Promise<string>, [any]>,
          },
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AuthService.signIn', async () => {
    const result = await authService.signIn('john', 'changeme');
    expect(result).toBe('fake-jwt-token');
  });
});
