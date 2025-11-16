"use client";

import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/layout/footer/Footer";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CampaignPage() {
  const overallScore = 78;

  const featuredChallenges = [
    { title: "Control orientado bajo presión", type: "Técnica", points: 50 },
    { title: "Sprint 40m", type: "Física", points: 30 },
    { title: "Disciplina semanal", type: "Mental", points: 35 },
  ];

  const milestones = [
    { date: "2025-02-01", text: "Semana 1: +2 puntos OL" },
    { date: "2025-02-08", text: "Semana 2: Objetivo físico cumplido" },
    { date: "2025-02-15", text: "Semana 3: Nuevo récord de precisión" },
  ];

  const budgetBreakdown = [
    { label: "Nutrición", value: 200 },
    { label: "Entrenador personal", value: 350 },
    { label: "Viajes a pruebas", value: 300 },
    { label: "Equipamiento", value: 150 },
    { label: "Fisioterapia", value: 200 },
  ];
  const total = budgetBreakdown.reduce((acc, i) => acc + i.value, 0);

  return (
    <div className="min-h-screen bg-white space-y-12">
      <DashboardNavbar
        link={{
          label: "Subir Video",
          href: "/dashboard/challenges/upload",
          icon: <Plus />,
        }}
        returnData={{ label: "Volver al panel", href: "/dashboard" }}
      />

      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto">
        <h2 className="text-4xl font-bold text-black uppercase font-kensmark mb-6">
          Campaña del Jugador
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-48 h-48 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                  <span className="text-gray-500">Foto</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500">Video presentación</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm uppercase text-gray-600">
                      Rating OL
                    </span>
                    <div className="px-3 py-1 rounded-full bg-black text-white text-sm font-bold">
                      {overallScore}/100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-3">
                  Metas deportivas
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Mejorar precisión de pase al 90%</li>
                  <li>Aumentar resistencia aeróbica nivel 8/10</li>
                  <li>Prueba en club semiprofesional</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-3">
                  Presupuesto con desglose
                </h3>
                <ul className="space-y-2 text-gray-800">
                  {budgetBreakdown.map((b) => (
                    <li key={b.label} className="flex items-center justify-between">
                      <span>{b.label}</span>
                      <span className="font-bold">${b.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 mt-4 pt-3 flex items-center justify-between">
                  <span className="text-gray-600">Total estimado</span>
                  <span className="text-xl font-bold text-black">${total}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">Cronograma</h3>
              <ul className="space-y-3">
                {milestones.map((m, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-24">{m.date}</span>
                    <span className="text-gray-800">{m.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Retos destacados verificados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredChallenges.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50"
                  >
                    <p className="font-bold text-black">{ch.title}</p>
                    <p className="text-sm text-gray-600">
                      {ch.type} • +{ch.points} puntos
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                      Validado • Staff OL
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-green-900 mb-2">
                Validaciones del Staff
              </h4>
              <p className="text-green-800 text-sm">
                Este jugador cuenta con validaciones en retos clave y avances
                significativos registrados por el equipo de Open League.
              </p>
            </div>

            <div className="bg-black text-white rounded-2xl p-6">
              <h4 className="text-lg font-bold mb-2">Apoyar campaña</h4>
              <p className="text-gray-300 text-sm mb-4">
                Puedes contribuir con inversiones o donaciones a su Wallet OL.
              </p>
              <Link
                href="/dashboard/wallet"
                className="inline-flex items-center justify-center w-full bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Ver Wallet
              </Link>
              <Link
                href="/campaign/juan-perez"
                className="inline-flex items-center justify-center w-full mt-3 bg-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-colors"
              >
                Ver campaña pública
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

