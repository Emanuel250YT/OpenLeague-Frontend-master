'use client';

import { Footer } from '@/components/layout/footer/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PublicCampaignPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? 'player';

  const overallScore = 78;
  const budget = [
    { label: 'Nutrición', value: 200 },
    { label: 'Entrenador personal', value: 350 },
    { label: 'Viajes a pruebas', value: 300 },
    { label: 'Equipamiento', value: 150 },
    { label: 'Fisioterapia', value: 200 },
  ];
  const total = budget.reduce((a, b) => a + b.value, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 w-[90%] sm:w-[85%] md:w-[80%] mx-auto py-12 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold text-black uppercase">
            Campaña: {decodeURIComponent(String(id))}
          </h1>
          <Link
            href="/dashboard/campaign"
            className="text-sm font-bold text-gray-600 hover:text-black transition-colors"
          >
            Ver versión interna
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">Video presentación</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-3">
                <span className="text-sm uppercase text-gray-600">Rating OL</span>
                <div className="px-3 py-1 rounded-full bg-black text-white text-sm font-bold">{overallScore}/100</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">Sobre mí</h3>
              <p className="text-gray-700">
                Soy un jugador comprometido en avanzar a nivel profesional. Busco apoyo para ejecutar mi plan de alto
                rendimiento y alcanzar pruebas en clubes.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">Objetivo de campaña</h3>
              <ul className="space-y-2">
                {budget.map((b) => (
                  <li key={b.label} className="flex items-center justify-between text-gray-800">
                    <span>{b.label}</span>
                    <span className="font-bold">${b.value}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 mt-4 pt-3 flex items-center justify-between">
                <span className="text-gray-600">Total estimado</span>
                <span className="text-xl font-bold text-black">${total}</span>
              </div>
              <button className="cursor-pointer w-full mt-4 bg-black text-white px-6 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors">
                Apoyar campaña (simulado)
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


