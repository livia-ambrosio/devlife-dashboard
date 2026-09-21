import { useState, useEffect } from "react";

function Relogio() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("⏰ Relógio de Filmes MONTADO — Intervalo ativo");
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    // Função de limpeza quando o componente é escondido/desmontado
    return () => {
      console.log("💀 Relógio de Filmes DESMONTADO — Intervalo limpo");
      clearInterval(intervalo);
    };
  }, []);

  return (
    <span className="font-mono text-emerald-400 text-sm bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
      {hora}
    </span>
  );
}

export default Relogio;