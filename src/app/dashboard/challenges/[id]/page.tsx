'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { Footer } from '@/components/layout/footer/Footer';

const mockChallenges = {
  1: {
    id: 1,
    title: 'Control orientado bajo presión',
    type: 'Técnica',
    status: 'Validado',
    points: 50,
    date: '2025-01-14',
    votes: { pro: 8, community: 45, staff: true },
  },
  2: {
    id: 2,
    title: 'Sprint 40 metros',
    type: 'Física',
    status: 'En validación',
    points: 30,
    date: '2025-01-15',
    votes: { pro: 3, community: 12, staff: false },
  },
  3: {
    id: 3,
    title: 'Toma de decisiones en espacio reducido',
    type: 'Táctica',
    status: 'Pendiente',
    points: 40,
    date: '2025-01-15',
  },
} as const;

export default function ChallengeDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || '1';
  const challenge = mockChallenges[Number(id) as 1 | 2 | 3] ?? mockChallenges[1];

  return (
    <div className="min-h-screen bg-white space-y-12">
      <DashboardNavbar
        returnData={{
          label: 'Volver a Retos',
          href: '/dashboard/challenges',
        }}
      />
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto">
        <h2 className="text-4xl font-bold text-black uppercase font-kensmark mb-6">Detalle del Reto</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:col-span-2">
            <div className="w-full aspect-video rounded-xl bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500">Video del reto (placeholder)</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{challenge.title}</h3>
            <p className="text-gray-600 mb-4">
              {challenge.type} • {challenge.date} • +{challenge.points} puntos
            </p>
            <p className="text-sm text-gray-700">
              Descripción: evidencia subida por el jugador. Aquí se mostrarían comentarios de validadores, notas de
              revisión y observaciones del staff.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-black mb-2">Estado</h4>
              <div className="inline-flex px-3 py-1 rounded-full text-sm font-bold bg-black text-white">
                {challenge.status}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-black mb-3">Validación 3 capas</h4>
              {'votes' in challenge ? (
                <ul className="space-y-2 text-sm text-gray-800">
                  <li className="flex items-center justify-between">
                    <span>Jugadores PRO</span>
                    <span className="font-bold">{challenge.votes!.pro}/10</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Comunidad</span>
                    <span className="font-bold">{challenge.votes!.community}/50</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Staff OL</span>
                    <span className="font-bold">{challenge.votes!.staff ? '✓' : 'Pendiente'}</span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-600 text-sm">Aún no enviado para validación.</p>
              )}
            </div>
            <Link
              href="/dashboard/challenges/upload"
              className="inline-flex items-center justify-center w-full bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors"
            >
              Subir nuevo reto
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


