import { useState, useEffect } from "react";
import NotificationPrompt from "./components/NotificationPrompt";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";
import SearchBar from "./components/SearchBar";
import { notificarLocal } from "./notifications";
import { agendarSincronizacao } from "./backgroundSync";

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
  const [busca, setBusca] = useState("");
  const [anuncio, setAnuncio] = useState("");

  // Atualiza o localStorage sempre que os filmes mudam
  useEffect(() => {
    localStorage.setItem("cine-filmes", JSON.stringify(filmes));
  }, [filmes]);

  // Escuta mensagens de sincronização enviadas pelo Service Worker
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    function aoReceberMensagem(evento) {
      if (evento.data?.tipo === "SINCRONIZADO") {
        setAnuncio("🔄 Sincronização em segundo plano concluída.");
      }
    }
    navigator.serviceWorker.addEventListener("message", aoReceberMensagem);
    return () => navigator.serviceWorker.removeEventListener("message", aoReceberMensagem);
  }, []);

  function avisarMudancaOffline() {
    if (!navigator.onLine) {
      agendarSincronizacao("sincronizar-filmes");
      setAnuncio((atual) => `${atual} A sincronização ocorrerá quando a conexão voltar.`);
    }
  }

  function adicionarFilme(novoFilme) {
    const filmeComId = { ...novoFilme, id: Date.now(), assistido: false };
    setFilmes((atual) => [filmeComId, ...atual]);
    setAnuncio(`Filme "${novoFilme.titulo}" adicionado ao catálogo.`);
    avisarMudancaOffline();
  }

  function alternarAssistido(id) {
    const filme = filmes.find((f) => f.id === id);
    if (!filme) return;

    const vaiConcluir = !filme.assistido;
    const status = vaiConcluir ? "assistido" : "pendente";

    setFilmes((atual) =>
      atual.map((f) => (f.id === id ? { ...f, assistido: vaiConcluir } : f))
    );
    setAnuncio(`Filme "${filme.titulo}" marcado como ${status}.`);

    // Dispara notificação local se o filme for de prioridade/expectativa alta
    if (vaiConcluir && (filme.avaliacao === "alta" || filme.prioridade === "alta")) {
      notificarLocal("Filme concluído! 🎬🎉", {
        body: `Já assististe a "${filme.titulo}".`,
      });
    }
  }

  function removerFilme(id) {
    const filme = filmes.find((f) => f.id === id);
    setFilmes((atual) => atual.filter((f) => f.id !== id));
    if (filme) {
      setAnuncio(`Filme "${filme.titulo}" removido do catálogo.`);
    }
    avisarMudancaOffline();
  }

  const filmesFiltrados = filmes.filter((filme) => {
    const atendeFiltro =
      filtro === "todos" ||
      (filtro === "pendentes" && !filme.assistido) ||
      (filtro === "assistidos" && filme.assistido);

    const atendeBusca =
      filme.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      filme.genero.toLowerCase().includes(busca.toLowerCase());

    return atendeFiltro && atendeBusca;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Região aria-live para acessibilidade */}
      <div className="sr-only" aria-live="polite">
        {anuncio}
      </div>

      <Header />
      
      {/* Aviso/Prompt de Notificações */}
      <NotificationPrompt />

      <main className="max-w-4xl mx-auto w-full p-4 space-y-6 flex-1">
        <MovieForm onAdicionar={adicionarFilme} />

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-100">
              Meus Filmes ({filmesFiltrados.length})
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTROS.map((f) => (
              <button
                key={f.valor}
                onClick={() => setFiltro(f.valor)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filtro === f.valor
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </div>

        <SearchBar busca={busca} setBusca={setBusca} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filmesFiltrados.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              onAlternar={alternarAssistido}
              onRemover={removerFilme}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;