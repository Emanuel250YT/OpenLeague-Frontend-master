'use client';

import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { Footer } from '@/components/layout/footer/Footer';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'validation', message: 'Tu reto de precisión fue validado por el staff', time: 'Hace 2h' },
    { id: 2, type: 'scholarship', message: 'Nueva beca disponible para Modo PRO', time: 'Hace 5h' },
    { id: 3, type: 'challenge', message: 'Tienes 1 reto pendiente para hoy', time: 'Hoy' },
    { id: 4, type: 'wallet', message: 'Recibiste una donación de $20', time: 'Ayer' },
  ];

  return (
    <div className="min-h-screen bg-white space-y-12">
      <DashboardNavbar
        returnData={{
          label: 'Volver al panel',
          href: '/dashboard',
        }}
      />
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto">
        <h2 className="text-4xl font-bold text-black uppercase font-kensmark mb-6">Notificaciones</h2>
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-black">{n.message}</p>
                <span className="text-xs text-gray-500">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}


