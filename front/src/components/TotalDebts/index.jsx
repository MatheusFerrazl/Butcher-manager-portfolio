import { useMemo } from "react";

function TotalDebts({ clients }) {
  const total = useMemo(() => {
    return clients.reduce((acc, client) => {
      const balance = Number(client.balance);
      // Somamos apenas se o saldo for negativo (dívida)
      if (balance < 0) {
        return acc + Math.abs(balance);
      }
      return acc;
    }, 0);
  }, [clients]);

  return (
    <div className="flex justify-center max-w-4xl mx-auto mt-4 mb-10">
      <div className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-2xl flex flex-col items-end shadow-lg">
        <span className="text-zinc-400 text-sm uppercase tracking-wider">Total em Dívidas</span>
        <span className="text-red-500 text-3xl font-bold">
          {`R$ ${total.toFixed(2)}`}
        </span>
      </div>
    </div>
  );
}

export default TotalDebts;