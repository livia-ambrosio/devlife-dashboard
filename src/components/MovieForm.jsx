import { useState } from "react";

function MovieForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("Ação");
  const [avaliacao, setAvaliacao] = useState("alta");

  function aoEnviar(evento) {
    evento.preventDefault();
    if (titulo.trim() === "") return;

    // Envia os dados para o componente App.jsx
    onAdicionar({ titulo, genero, avaliacao });
    
    // Limpa o campo do título após enviar
    setTitulo("");
  }

  return (
    <form
      onSubmit={aoEnviar}
      className="bg-slate-800 rounded-xl shadow-md p-5 mb-8 flex flex-wrap gap-3 items-end border border-slate-700"
    >
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-semibold text-slate-300 mb-1">
          Novo Filme / Série
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex: Interstellar, Batman..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-1">
          Gênero
        </label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option>Ação</option>
          <option>Drama</option>
          <option>Ficção Científica</option>
          <option>Comédia</option>
          <option>Terror</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-1">
          Prioridade / Expectativa
        </label>
        <select
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg transition-colors cursor-pointer"
      >
        + Adicionar
      </button>
    </form>
  );
}

export default MovieForm;