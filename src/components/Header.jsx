import { useState } from "react";
import Relogio from "./Relogio";

function Header() {
  const [mostrarRelogio, setMostrarRelogio] = useState(true);

  return (
    <header className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between border-b border-slate-800">
      <h1 className="text-2xl font-bold tracking-wide">
        🎬 DevFlix <span className="text-emerald-400">Catalog</span>
      </h1>

      <div className="flex items-center gap-3">
        {mostrarRelogio && <Relogio />}
        <button
          onClick={() => setMostrarRelogio(!mostrarRelogio)}
          className="text-xs border border-slate-700 hover:border-emerald-400 px-3 py-1 rounded-lg transition-colors text-slate-300 cursor-pointer"
        >
          {mostrarRelogio ? "Esconder relógio" : "Mostrar relógio"}
        </button>
      </div>
    </header>
  );
}

export default Header;