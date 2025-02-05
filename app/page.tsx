"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Hoş Geldiniz</h1>
      <button
        onClick={() => router.push('/users')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Kullanıcılar Sayfasına Git
      </button>
    </div>
  );
}
