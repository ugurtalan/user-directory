"use client";
import Link from 'next/link';
export default function Home() {
  return (
    <div suppressHydrationWarning={true}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-2xl font-bold mb-4 text-black">Hoş Geldiniz</h1>
      <Link className="border-black border-2 rounded-md p-4 bg-blue-400 font-bold hover:bg-slate-200 transition duration-400 " href="/users">
      Kullanıcıları görüntüle
      </Link>

     
      

    </div>
    </div>
  );
}
