import { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";

const FILMES_INICIAIS = [
  {
    id: 1,
    titulo: "O Poderoso Chefão",
    genero: "Drama",
    avaliacao: "alta",
    assistido: true,
  },
  {
    id: 2,
    titulo: "Interstellar",
    genero: "Ficção Científica",
    avaliacao: "alta",
    assistido: false,
  },
  {
    id: 3,
    titulo: "Batman: O Cavaleiro das Trevas",
    genero: "Ação",
    avaliacao: "media",
    assistido: false,
  },
];

const FILTROS = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "pendentes", rotulo: "Para Assistir" },
  { valor: "assistidos", rotulo: "Assistidos" },
];

function App() {
  // Inicialização do useState usando localStorage (lido apenas 1x)
  const [filmes, setFilmes] = useState(() => {
    const salvos = localStorage.getItem("devflix-filmes");
    return salvos ? JSON.parse(salvos) : FILMES_INICIAIS;
  });

  const [filtro, setFiltro] = useState("todos");

  // Salva no localStorage sempre que a lista de filmes mudar
  useEffect(() => {
    localStorage.setItem("devflix-filmes", JSON.stringify(filmes));
  }, [filmes]);

  // Função para adicionar novo filme sem mutar o array antigo
  function adicionarFilme(novoFilme) {
    setFilmes((atual) => [
      ...atual,
      { ...novoFilme, id: Date.now(), assistido: false },
    ]);
  }

  // Função para alternar entre assistido/pendente usando .map()
  function alternarAssistido(id) {
    setFilmes((atual) =>
      atual.map((f) => (f.id === id ? { ...f, assistido: !f.assistido } : f))
    );
  }

  // Função para remover um filme usando .filter()
  function removerFilme(id) {
    setFilmes((atual) => atual.filter((f) => f.id !== id));
  }

  // Filtra os filmes sem alterar a lista principal
  const filmesFiltrados = filmes.filter((f) => {
    if (filtro === "pendentes") return !f.assistido;
    if (filtro === "assistidos") return f.assistido;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <MovieForm onAdicionar={adicionarFilme} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-200">
            Minha Lista de Filmes ({filmesFiltrados.length})
          </h2>

          {/* Botões de Filtro */}
          <div className="flex gap-2">
            {FILTROS.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setFiltro(opcao.valor)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filtro === opcao.valor
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

        {/* Renderização da Lista de Filmes */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filmesFiltrados.map((filme) => (
            <MovieCard
              key={filme.id}
              titulo={filme.titulo}
              genero={filme.genero}
              avaliacao={filme.avaliacao}
              assistido={filme.assistido}
              onToggle={() => alternarAssistido(filme.id)}
              onRemover={() => removerFilme(filme.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;