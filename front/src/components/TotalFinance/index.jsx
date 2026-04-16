function TotalFinance({ filteredSales, totalLoss }) {
  // 1. Total bruto das vendas no período
  const totalVendido = filteredSales.reduce((acc, sale) => acc + Number(sale.total), 0);

  // 2. Total efetivamente pago (o que entrou no bolso)
  const totalRecebido = filteredSales.reduce((acc, sale) => {
    const pagoNaVenda = sale.payments?.reduce((pAcc, p) => pAcc + Number(p.amount), 0) || 0;
    return acc + pagoNaVenda;
  }, 0);

  // 3. O que falta receber
  const totalPendente = totalVendido - totalRecebido;

  // 4. VALOR FINAL (Entrada - Perdas)
  const lucroReal = totalRecebido - totalLoss;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-zinc-800/60 p-4 rounded-xl border border-zinc-700 shadow-sm">
        <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 tracking-wider">Vendido no Filtro</p>
        <p className="text-xl font-mono text-white font-semibold">R$ {totalVendido.toFixed(2)}</p>
      </div>

      <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/20 shadow-sm">
        <p className="text-green-600 text-[10px] uppercase font-bold mb-1 tracking-wider">Saldo Líquido (Caixa - Perdas)</p>
        <p className="text-xl font-mono text-green-400 font-semibold tracking-tighter">
          R$ {lucroReal.toFixed(2)}
        </p>
        <p className="text-[9px] text-zinc-400 mt-1">Bruto: R$ {totalRecebido.toFixed(2)}</p>
      </div>

      <div className="bg-red-900/30 p-4 rounded-xl border border-red-500/20 shadow-sm">
        <p className="text-red-600 text-[10px] uppercase font-bold mb-1 tracking-wider">Pendente (Fiado)</p>
        <p className="text-xl font-mono text-red-400 font-semibold">R$ {totalPendente.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default TotalFinance;