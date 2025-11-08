import Image from "next/image";

export default function Home() {

  async function getPosts() {
  const res = await fetch('http://localhost:3000/getHello');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 font-sora text-white">Welcome to <span className="title-gradient inline-block">TheTraderHub</span></h2>
        </div>
    </div>
  );
}
