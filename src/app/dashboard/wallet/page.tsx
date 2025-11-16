"use client";

import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/layout/footer/Footer";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";

type Wallet = {
  address: string;
  network?: string | null;
  currency?: string | null;
  isDefault?: boolean | null;
};

export default function WalletPage() {
  const balances = {
    tokens: 1250,
    estimatedUsd: 125.0,
  };

  const incoming = [
    { type: "Inversión", amount: 50, date: "2025-02-10" },
    { type: "Donación", amount: 20, date: "2025-02-09" },
    { type: "Beca", amount: 100, date: "2025-02-05" },
    { type: "Recompensa", amount: 10, date: "2025-02-01" },
  ];

  const actions = [
    { label: "Gastar dentro de OL", disabled: false },
    { label: "Transferir a cuenta bancaria", disabled: false },
    { label: "Usar como Wallet Web3", disabled: false },
  ];

  const expenseSteps = [
    "Subir recibo",
    "Foto del producto/servicio",
    "Proveedor verificado (si aplica)",
  ];

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [addr, setAddr] = useState("");
  const [net, setNet] = useState("");
  const [cur, setCur] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setError(null);
      try {
        const list = await api.auth.listWallets();
        console.log(list)
        if (mounted) setWallets(Array.isArray(list) ? list : []);
      } catch {
        setError("No se pudieron cargar las wallets.");
      } finally {
        if (mounted) setLoadingWallets(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await api.auth.addWallet({
        address: addr,
        network: net || undefined,
        currency: cur || undefined,
        isDefault,
      });
      const list = await api.auth.listWallets();
      setWallets(Array.isArray(list) ? list : []);
      setSuccess("Wallet agregada correctamente.");
      setAddr("");
      setNet("");
      setCur("");
      setIsDefault(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo agregar la wallet.";
      setError(typeof msg === "string" ? msg : "No se pudo agregar la wallet.");
    } finally {
      setSaving(false);
    }
  };

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
          Wallet del Jugador
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <div className="bg-black text-white p-6 rounded-2xl">
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">
                Tu Wallet
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Tokens OL</p>
                  <p className="text-3xl font-bold">{balances.tokens}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Valor estimado</p>
                  <p className="text-2xl font-bold">${balances.estimatedUsd.toFixed(2)} USD</p>
                </div>
              </div>
              <button className="cursor-pointer w-full mt-4 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Ver detalles
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Ingresos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {incoming.map((i, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <p className="font-bold text-black">{i.type}</p>
                    <p className="text-sm text-gray-600">${i.amount}</p>
                    <p className="text-xs text-gray-500 mt-1">{i.date}</p>
                  </div>
                ))}
              </div>
              <a
                href="/dashboard/wallet/expense"
                className="inline-flex items-center justify-center mt-4 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors"
              >
                Cargar gasto
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Tus wallets</h3>
              {error && (
                <div className="mb-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}
              {loadingWallets ? (
                <p className="text-sm text-gray-600">Cargando...</p>
              ) : wallets.length === 0 ? (
                <p className="text-sm text-gray-600">No tienes wallets agregadas.</p>
              ) : (
                <div className="space-y-2">
                  {wallets.map((w) => (
                    <div key={`${w.address}-${w.network ?? ""}`} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="font-bold text-black break-all">{w.address}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {w.network || "network: N/A"} • {w.currency || "currency: N/A"} {w.isDefault ? "• Default" : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Agregar wallet</h3>
              {success && (
                <div className="mb-3 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800">
                  {success}
                </div>
              )}
              <form onSubmit={onAddWallet} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dirección</label>
                  <input
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                    placeholder="0x..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Red (opcional)</label>
                  <input
                    value={net}
                    onChange={(e) => setNet(e.target.value)}
                    placeholder="Ethereum / Polygon / ..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Moneda (opcional)</label>
                  <input
                    value={cur}
                    onChange={(e) => setCur(e.target.value)}
                    placeholder="USDC / USDT / ..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    id="isDefault"
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-700">Marcar como principal</label>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="cursor-pointer w-full bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors disabled:opacity-60"
                  >
                    {saving ? "Guardando..." : "Agregar wallet"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-black mb-3">
                ¿Qué puedes hacer?
              </h4>
              <div className="space-y-2">
                {actions.map((a) => (
                  <button
                    key={a.label}
                    disabled={a.disabled}
                    className="cursor-pointer w-full text-left px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-bold disabled:opacity-50"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-3">
                Gastos transparentes
              </h4>
              <p className="text-blue-800 text-sm mb-3">
                Sube tus comprobantes y usa proveedores verificados para máxima
                transparencia.
              </p>
              <ul className="space-y-2">
                {expenseSteps.map((step) => (
                  <li key={step} className="flex items-center gap-2 text-sm text-blue-900">
                    <svg
                      className="w-4 h-4 text-blue-700 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-black mb-2">
                Proveedores verificados
              </h4>
              <p className="text-gray-700 text-sm">
                Contrata servicios a través de la red OL (nutricionistas,
                entrenadores, fisioterapeutas, equipamiento). Todas las transacciones
                quedan registradas y auditables.
              </p>
              <a
                href="/dashboard/providers"
                className="inline-flex items-center justify-center mt-4 bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                Ver proveedores
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

