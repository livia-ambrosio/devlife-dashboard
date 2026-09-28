import { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";

const FILMES_INICIAIS = [
  { id: 1, titulo: "Interstellar", genero: "Ficção Científica", avaliacao: "alta", assistido: true },
  { id: 2, titulo: "O Chefão", genero: "Drama", avaliacao: "alta", assistido: false },
  { id: 3, titulo: "Batman", genero: "Ação", avaliacao: "media", assistido: false },
];

const FILTROS = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "pendentes", rotulo: "Para Assistir" },
  { valor: "assistidos", rotulo: "Assistidos" },
];

function App() {
  const [filmes, setFilmes] = useState(() => {
    const salvos = localStorage.getItem("cine-filmes");
    return salvos ? JSON.parse(salvos) : FILMES_INICIAIS;
  });

  const [filtro, setFiltro] = useState("todos");
  const [anuncio, setAnuncio] = useState("");

  useEffect(() => {
    localStorage.setItem("cine-filmes", JSON.stringify(filmes));
  }, [filmes]);

  function adicionarFilme(novoFilme) {
    setFilmes((atual) => [
      ...atual,
      { ...novoFilme, id: Date.now(), assistido: false },
    ]);
    setAnuncio(`Filme "${novoFilme.titulo}" adicionado ao catálogo.`);
  }

  function alternarAssistido(id) {
    const filme = filmes.find((f) => f.id === id);
    const vaiAssistir = !filme.assistido;
    const status = vaiAssistir ? "marcado como assistido" : "marcado como não assistido";

    setFilmes((atual) =>
      atual.map((f) => (f.id === id ? { ...f, assistido: !f.assistido } : f))
    );
    setAnuncio(`Filme "${filme.titulo}" ${status}.`);
  }

  function removerFilme(id) {
    const filme = filmes.find((f) => f.id === id);
    setFilmes((atual) => atual.filter((f) => f.id !== id));
    setAnuncio(`Filme "${filme.titulo}" removido do catálogo.`);
  }

  const filmesFiltrados = filmes.filter((f) => {
    if (filtro === "pendentes") return !f.assistido;
    if (filtro === "assistidos") return f.assistido;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Passo 5: Skip link (só aparece no foco via Tab) */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-bold"
      >
        Pular para o conteúdo
      </a>

      <Header />

      {/* Passo 6: Região de leitores de tela (aria-live) */}
      <div aria-live="polite" role="status" className="sr-only">
        {anuncio}
      </div>

      <main id="conteudo" className="max-w-4xl mx-auto px-6 py-10">
        <MovieForm onAdicionar={adicionarFilme} />

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-slate-200">
            Meus Filmes ({filmesFiltrados.length})
          </h2>

          {/* Passo 6: Grupo de botões com role e aria-pressed */}
          <div role="group" aria-label="Filtrar filmes" className="flex gap-2">
            {FILTROS.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setFiltro(opcao.valor)}
                aria-pressed={filtro === opcao.valor}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  filtro === opcao.valor
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2">
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

      <footer className="text-center text-xs text-slate-500 py-6">
        CineCatalog — Projeto de Frontend SA03
      </footer>
    </div>
  );
}

export default App;