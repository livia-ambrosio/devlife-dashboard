const prioridadeEstilo = {
  alta: "bg-red-900/40 text-red-300 border border-red-700/50",
  media: "bg-yellow-900/40 text-yellow-300 border border-yellow-700/50",
  baixa: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50",
};

function MovieCard({ titulo, genero, avaliacao, assistido, onToggle, onRemover }) {
  return (
    <article
      className={`rounded-xl shadow-md p-5 border transition-all ${
        assistido
          ? "bg-slate-900/60 border-slate-800"
          : "bg-slate-800 border-slate-700"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
          {genero}
        </span>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            prioridadeEstilo[avaliacao] || "bg-slate-700 text-slate-300"
          }`}
        >
          {avaliacao}
        </span>
      </div>

      {/* Título com text-slate-400 para garantir contraste total */}
      <h2
        className={`text-lg font-semibold mb-4 ${
          assistido ? "text-slate-400 line-through" : "text-white"
        }`}
      >
        {titulo}
      </h2>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={assistido}
            onChange={onToggle}
            className="w-4 h-4 accent-emerald-500 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 focus:ring-offset-slate-800"
          />
          Assistido
        </label>

        <button
          onClick={onRemover}
          aria-label={`Remover filme: ${titulo}`}
          className="text-xs text-red-400 hover:text-red-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1.5 py-0.5"
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default MovieCard;