import { useEffect, useState, useMemo } from "react";
import TotalFinance from "../TotalFinance";
import PaymentTypeDetails from "../PaymentTypeDetails";
import LossHistory from "../LossHistory";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [openSaleId, setOpenSaleId] = useState(null);
  const [totalLossValue, setTotalLossValue] = useState(0);

  const [filter, setFilter] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedMonth, setSelectedMonth] = useState("");

  const [paymentValues, setPaymentValues] = useState({});
  const [paymentDates, setPaymentDates] = useState({});
  const [paymentTypes, setPaymentTypes] = useState({});

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("https://butcher-manager.onrender.com/sales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 ESSENCIAL
        },
      });

      const data = await res.json();
      setSales(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro:", error);
      setSales([]);
    }
  }

  const getTotalPaid = (sale) =>
    sale.payments?.reduce((acc, p) => acc + Number(p.amount || 0), 0) || 0;
  const getRemainingValue = (sale) =>
    Number(sale.total || 0) - getTotalPaid(sale);

  // Tolerância mínima apenas para imprecisão de ponto flutuante (ex: 0.000000001)
  const getStatus = (sale) =>
    getRemainingValue(sale) <= 0.001 ? "PAID" : "PENDING";

  const toggleSale = (id) => setOpenSaleId((prev) => (prev === id ? null : id));

  const handlePaymentChange = (id, v) =>
    setPaymentValues((prev) => ({ ...prev, [id]: v }));
  const handleDateChange = (id, v) =>
    setPaymentDates((prev) => ({ ...prev, [id]: v }));
  const handleTypeChange = (id, v) =>
    setPaymentTypes((prev) => ({ ...prev, [id]: v }));

  async function handlePayment(saleId) {
    const currentSale = sales.find((s) => s.id === saleId);
    if (!currentSale) return;

    const token = sessionStorage.getItem("token");

    // Forçamos o valor digitado a ter apenas 2 casas decimais
    const amount = Number(Number(paymentValues[saleId]).toFixed(2));

    // Arredondamos o restante para 2 casas decimais para evitar o erro de 0.00999
    const remaining = Number(getRemainingValue(currentSale).toFixed(2));

    // Validação: permitimos o pagamento se o valor for menor ou IGUAL ao restante arredondado
    if (!amount || amount <= 0 || amount > remaining) {
      console.warn("Valor inválido ou maior que o restante");
      return;
    }

    try {
      await fetch("https://butcher-manager.onrender.com/addPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          saleId,
          amount: amount, 
          date: paymentDates[saleId] || new Date().toISOString().split("T")[0],
          type: paymentTypes[saleId] || "dinheiro",
        }),
      });

      setPaymentValues((prev) => ({ ...prev, [saleId]: "" }));
      fetchSales();
    } catch (error) {
      console.error(error);
    }
  }

  const { filteredSales, typeTotals } = useMemo(() => {
    const currentSales = Array.isArray(sales) ? sales : [];
    const filtered = currentSales.filter((sale) => {
      const saleDateStr = String(sale.date || "");
      const matchesName = (sale.clientName || "")
        .toLowerCase()
        .includes(filter.toLowerCase());
      const matchesPending = showPendingOnly
        ? getRemainingValue(sale) > 0.001
        : true;
      const matchesDate = selectedDate
        ? saleDateStr.startsWith(selectedDate)
        : true;
      const matchesMonth = selectedMonth
        ? saleDateStr.startsWith(selectedMonth)
        : true;
      return matchesName && matchesPending && matchesDate && matchesMonth;
    });

    const totals = { dinheiro: 0, cartão: 0, pix: 0 };
    filtered.forEach((sale) => {
      sale.payments?.forEach((p) => {
        const type = (p.type || "dinheiro")
          .toLowerCase()
          .replace("cartao", "cartão");
        if (totals.hasOwnProperty(type)) totals[type] += Number(p.amount || 0);
      });
    });

    return { filteredSales: filtered, typeTotals: totals };
  }, [sales, filter, showPendingOnly, selectedDate, selectedMonth]);

  return (
    <div className="text-white w-9/10 sm:w-2/3 mx-auto mt-10 pb-10">
      {/* FILTROS */}
      <div className="flex flex-col gap-4 mb-6 bg-zinc-800/40 p-4 rounded-xl border border-zinc-700">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 items-center w-full bg-white/10 rounded-lg px-2 border border-white/20">
            <img
              className="size-5 opacity-50"
              src="/images/search.png"
              alt="Pesquisar"
            />
            <input
              className="h-9 w-full bg-transparent focus:outline-none text-sm"
              value={filter}
              type="text"
              placeholder="Buscar cliente..."
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowPendingOnly(!showPendingOnly)}
            className={`px-4 py-2 rounded-lg border text-sm transition-colors ${showPendingOnly ? "bg-red-600 border-red-500" : "bg-zinc-700 border-zinc-600"}`}
          >
            {showPendingOnly ? "Pendentes" : "Todos"}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg text-sm flex-1"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedMonth("");
            }}
          />
          <input
            type="month"
            className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg text-sm flex-1"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setSelectedDate("");
            }}
          />
          <button
            onClick={() => {
              setSelectedDate("");
              setSelectedMonth("");
              setFilter("");
            }}
            className="text-xs text-zinc-400 hover:text-white"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      <TotalFinance filteredSales={filteredSales} totalLoss={totalLossValue} />
      <PaymentTypeDetails totals={typeTotals} />

      <div className="space-y-3">
        {filteredSales.map((sale) => (
          <div
            key={sale.id}
            className="border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900"
          >
            <div
              onClick={() => toggleSale(sale.id)}
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-zinc-800"
            >
              <div>
                <p className="font-bold">{sale.clientName}</p>
                <p className="text-sm opacity-70">{sale.date}</p>
              </div>
              <div className="text-right">
                <p>R$ {Number(sale.total).toFixed(2)}</p>
                <p
                  className={`text-sm font-bold ${getStatus(sale) === "PAID" ? "text-green-500" : "text-red-500"}`}
                >
                  {getStatus(sale) === "PAID" ? "Pago" : "Pendente"}
                </p>
              </div>
            </div>
            {openSaleId === sale.id && (
              <div className="p-4 border-t border-zinc-700 bg-zinc-900/50">
                {/* Itens da venda */}
                {sale.items?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">
                      Itens da venda
                    </p>
                    <div className="space-y-1">
                      {sale.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-xs bg-zinc-800 rounded px-3 py-2"
                        >
                          <span className="text-zinc-200 w-25">
                            {item.meatName}
                          </span>
                          <span className="text-zinc-400">
                            {Number(item.weight).toFixed(3)} kg
                          </span>
                          <span className="text-zinc-300">
                            R$ {Number(item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lista de pagamentos */}
                <div className="space-y-1 mb-3">
                  {sale.payments?.map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between text-xs opacity-80"
                    >
                      <span>
                        {p.date} ({p.type})
                      </span>
                      <span>R$ {Number(p.amount).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total pago e restante */}
                <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-zinc-700 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Total pago:</span>
                    <span className="text-zinc-300">
                      R$ {getTotalPaid(sale).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="opacity-70">Restante a pagar:</span>
                    <span
                      className={
                        getRemainingValue(sale) > 0.001
                          ? "text-red-400"
                          : "text-green-400"
                      }
                    >
                      R${" "}
                      {getRemainingValue(sale) > 0.001
                        ? getRemainingValue(sale).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>

                {/* Input de novo pagamento */}
                {getRemainingValue(sale) > 0.001 && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <input
                      type="number"
                      placeholder="Valor"
                      value={paymentValues[sale.id] || ""}
                      onChange={(e) =>
                        handlePaymentChange(sale.id, e.target.value)
                      }
                      className="flex-1 bg-zinc-800 p-2 rounded text-sm outline-none"
                    />
                    <select
                      value={paymentTypes[sale.id] || "dinheiro"}
                      onChange={(e) =>
                        handleTypeChange(sale.id, e.target.value)
                      }
                      className="bg-zinc-800 p-2 rounded text-sm"
                    >
                      <option value="dinheiro">Dinheiro</option>
                      <option value="cartão">Cartão</option>
                      <option value="pix">PIX</option>
                    </select>
                    <button
                      onClick={() => handlePayment(sale.id)}
                      className="bg-green-600 px-4 py-2 rounded font-bold text-sm"
                    >
                      Pagar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="border-zinc-800 my-10" />

      <LossHistory
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        onTotalChange={(val) => setTotalLossValue(val)}
      />
    </div>
  );
}

export default SalesHistory;
