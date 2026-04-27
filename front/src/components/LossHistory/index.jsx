import { useEffect, useState } from "react";

function LossHistory({ selectedDate, selectedMonth, onTotalChange }) {
  const [losses, setLosses] = useState([]);

  async function fetchLosses() {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch("http://localhost:8000/losses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setLosses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchLosses();
  }, []);

  const filteredLosses = losses.filter((loss) => {
    const lossDateStr = String(loss.date || "");
    if (selectedDate) return lossDateStr.startsWith(selectedDate);
    if (selectedMonth) return lossDateStr.startsWith(selectedMonth);
    return true;
  });

  const totalValueLoss = filteredLosses.reduce(
    (acc, curr) => acc + Number(curr.value),
    0,
  );

  useEffect(() => {
    if (onTotalChange) onTotalChange(totalValueLoss);
  }, [totalValueLoss]);

  return (
    <div className="text-white w-full mt-10 p-6 bg-zinc-900/50 border border-red-900/30 rounded-2xl">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-red-500 font-black text-2xl uppercase">
            Prejuízos
          </h2>
          <p className="text-zinc-500 text-xs tracking-widest uppercase font-bold">
            Resumo de gastos do período
          </p>
        </div>
        <div className="text-right">
          <span className="text-zinc-500 text-[10px] block uppercase font-bold">
            Total Perdas
          </span>
          <span className="text-2xl font-black text-red-500">
            R$ {totalValueLoss.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {filteredLosses.map((loss) => (
          <div
            key={loss.id}
            className="flex justify-between items-center p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl"
          >
            <div>
              <p className="font-bold text-sm">{loss.description}</p>
              <p className="text-[10px] text-zinc-500">
                {new Date(loss.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="text-red-400 font-bold font-mono">
              - R$ {Number(loss.value).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LossHistory;
