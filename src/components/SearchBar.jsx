function SearchBar({ busca, setBusca }) {
  return (
    <div className="w-full">
      <label htmlFor="busca-filme" className="sr-only">
        Pesquisar filme ou género
      </label>
      <input
        id="busca-filme"
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Pesquisar por título ou género..."
        className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 px-4 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
  );
}

export default SearchBar;