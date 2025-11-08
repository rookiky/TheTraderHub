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
    <div className="">
      <main className="">
       
      </main>
    </div>
  );
}
