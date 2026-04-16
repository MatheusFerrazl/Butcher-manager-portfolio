function PaymentTypeDetails({ totals }) {
  const types = [
    { label: "Dinheiro", value: totals.dinheiro, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Cartão", value: totals.cartão, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "PIX", value: totals.pix, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {types.map((t) => (
        <div key={t.label} className={`${t.bg} border border-white/5 p-3 rounded-xl flex justify-between items-center`}>
          <span className="text-xs uppercase font-semibold opacity-60">{t.label}</span>
          <span className={`font-mono font-bold ${t.color}`}>
            R$ {t.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default PaymentTypeDetails