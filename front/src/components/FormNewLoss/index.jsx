import { useState } from "react";

function FormNewLoss() {
  const [lossData, setLossData] = useState({
    description: "", // O que aconteceu (Ex: Pneu do caminhão)
    value: "", // Quanto custou (R$)
    reason: "", // Detalhes extras (Ex: Estourou na BR-116)
    date: new Date().toISOString().split("T")[0],
  });

  function resetForm() {
    setLossData({
      description: "",
      value: "",
      reason: "",
      date: new Date().toISOString().split("T")[0],
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "/";
      return;
    }

    if (!lossData.description.trim() || !lossData.value) {
      alert("Por favor, preencha a descrição e o valor do prejuízo.");
      return;
    }

    try {
      const response = await fetch("https://butcher-manager.onrender.com/addLoss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...lossData,
          value: Number(lossData.value),
        }),
      });

      if (response.status === 401) {
        sessionStorage.removeItem("token");
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "/";
        return;
      }

      if (!response.ok) {
        const err = await response.json();
        console.error(err);
        alert("Erro ao salvar prejuízo");
        return;
      }

      resetForm();
    } catch (error) {
      console.error("Erro ao salvar prejuízo:", error);
      alert("Erro de conexão com o servidor");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white flex flex-col gap-3 bg-zinc-900 border border-zinc-700 w-full max-w-xl mx-auto mt-10 rounded-3xl p-8 shadow-2xl border-t-4 border-t-red-600"
    >
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">
          Registrar Prejuízo
        </h2>
        <p className="text-zinc-500 text-xs">
          Manutenções, quebras e gastos imprevistos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Descrição do Ocorrido */}
        <div className="flex flex-col md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 ml-1">
            Descrição do Gasto
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Conserto de Cerca"
            value={lossData.description}
            onChange={(e) =>
              setLossData({ ...lossData, description: e.target.value })
            }
            className="h-12 pl-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>

        {/* Valor do Prejuízo */}
        <div className="flex flex-col md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 ml-1">
            Valor (R$)
          </label>
          <input
            type="number"
            required
            step="0.01"
            placeholder="0,00"
            value={lossData.value}
            onChange={(e) =>
              setLossData({ ...lossData, value: e.target.value })
            }
            className="h-12 pl-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-red-400 font-bold"
          />
        </div>
      </div>

      {/* Observações / Detalhes */}
      <div className="flex flex-col">
        <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 ml-1">
          Motivo / Observações
        </label>
        <textarea
          rows="2"
          placeholder="Ex: Cerca destruída pelos bois no sítio..."
          value={lossData.reason}
          onChange={(e) => setLossData({ ...lossData, reason: e.target.value })}
          className="p-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-sm"
        />
      </div>

      {/* Data do Prejuízo */}
      <div className="flex flex-col">
        <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 ml-1">
          Data do Ocorrido
        </label>
        <input
          type="date"
          value={lossData.date}
          onChange={(e) => setLossData({ ...lossData, date: e.target.value })}
          className="h-12 px-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black rounded-xl py-4 transition-all shadow-lg shadow-red-900/20"
      >
        SALVAR GASTO / PREJUÍZO
      </button>
    </form>
  );
}

export default FormNewLoss;
