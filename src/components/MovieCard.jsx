const prioridadeEstilo = {
  alta: "bg-red-900/50 text-red-300 border border-red-700",
  media: "bg-yellow-900/50 text-yellow-300 border border-yellow-700",
  baixa: "bg-emerald-900/50 text-emerald-300 border border-emerald-700",
};

function MovieCard({ titulo, genero, avaliacao, assistido, onToggle, onRemover }) {
  return (
    <article
      className={`rounded-xl shadow-md p-5 transition-all border border-slate-700 bg-slate-800 ${
        assistido ? "opacity-50 grayscale" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
          {genero}
        </span>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${prioridadeEstilo[avaliacao]}`}
        >
          {avaliacao}
        </span>
      </div>

      <h2 className="text-lg font-semibold text-white mb-4">{titulo}</h2>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={assistido}
            onChange={onToggle}
            className="w-4 h-4 accent-emerald-500 rounded"
          />
          Assistido
        </label>

        <button
          onClick={onRemover}
          className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors cursor-pointer"
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default MovieCard;