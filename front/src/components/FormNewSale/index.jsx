import { useState } from "react";

function FormNewSale({ meatList = [], clientList = [] }) {
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState([
    { meatId: "", weight: "", pricePerKg: "", price: "" },
  ]);

  function resetForm() {
    setClientId("");
    setItems([{ meatId: "", weight: "", pricePerKg: "", price: "" }]);
  }

  function handleAddItem() {
    setItems((prev) => [
      ...prev,
      { meatId: "", weight: "", pricePerKg: "", price: "" },
    ]);
  }

  function handleMeatChange(index, meatId) {
    const selectedMeat = meatList.find((m) => String(m.id) === String(meatId));
    const defaultPrice = selectedMeat ? selectedMeat.price : "";

    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        meatId: meatId,
        pricePerKg: defaultPrice,
        // Se já houver peso, recalcula o total do item ao trocar a carne
        price: updated[index].weight
          ? (Number(updated[index].weight) * Number(defaultPrice)).toFixed(2)
          : "",
      };
      return updated;
    });
  }

  function handleItemChange(index, field, value) {
    setItems((prev) => {
      const updated = [...prev];
      const currentItem = { ...updated[index], [field]: value };

      // Cálculo: Total do Item = Peso * Preço por KG
      if (field === "weight" || field === "pricePerKg") {
        const w =
          parseFloat(field === "weight" ? value : currentItem.weight) || 0;
        const p =
          parseFloat(field === "pricePerKg" ? value : currentItem.pricePerKg) ||
          0;
        currentItem.price = (w * p).toFixed(2);
      }

      updated[index] = currentItem;
      return updated;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!clientId || items.some((item) => !item.meatId || !item.weight)) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formattedItems = items.map((item) => ({
      meatId: item.meatId,
      weight: Number(item.weight),
      price: Number(item.price),
    }));

    const total = formattedItems.reduce((acc, item) => acc + item.price, 0);

    const data = {
      clientId,
      date: new Date().toISOString().split("T")[0],
      total: Number(total.toFixed(2)),
      items: formattedItems,
    };

    try {
      const response = await fetch("http://localhost:8000/addSale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 AQUI
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resetForm();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white flex flex-col gap-3 bg-zinc-900 border border-zinc-700 w-full max-w-xl mx-auto mt-10 rounded-3xl p-8 shadow-2xl border-t-4 border-t-green-600"
    >
      <h2 className="text-center text-xl font-bold mb-2">Registrar Venda</h2>

      {/* CLIENTE */}
      <div className="flex flex-col">
        <label className="text-sm mb-1 text-zinc-400">Cliente</label>
        <select
          required
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="w-full h-12 pl-2 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecione o cliente</option>
          {clientList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.username}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-zinc-800 my-4" />

      {/* LISTA DE ITENS */}
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 border border-zinc-700 p-4 rounded-2xl bg-zinc-800/30"
          >
            {/* Seleção de Carne */}
            <div className="md:col-span-1">
              <label className="text-[10px] uppercase font-bold text-zinc-500">
                Carne
              </label>
              <select
                required
                value={item.meatId}
                onChange={(e) => handleMeatChange(index, e.target.value)}
                className="w-full h-10 pl-2 bg-zinc-700 rounded-lg"
              >
                <option value="">Selecione</option>
                {meatList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço por KG */}
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500">
                Preço p/ KG
              </label>
              <input
                type="number"
                step="0.01"
                value={item.pricePerKg}
                onChange={(e) =>
                  handleItemChange(index, "pricePerKg", e.target.value)
                }
                className="w-full h-10 pl-2 bg-zinc-700 rounded-lg text-yellow-500 font-semibold"
              />
            </div>

            {/* Peso */}
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500">
                Peso (Kg)
              </label>
              <input
                type="number"
                required
                step="0.001"
                placeholder="0.000"
                value={item.weight}
                onChange={(e) =>
                  handleItemChange(index, "weight", e.target.value)
                }
                className="w-full h-10 pl-2 bg-zinc-700 rounded-lg"
              />
            </div>

            {/* Subtotal */}
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500">
                Subtotal
              </label>
              <div className="w-full h-10 flex items-center px-2 bg-zinc-900/50 border border-zinc-700 rounded-lg text-green-500 font-bold">
                R$ {item.price || "0.00"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddItem}
        className="mt-2 border-2 border-dashed border-zinc-700 rounded-2xl py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
      >
        + adicionar outro item
      </button>

      {/* RESUMO E ENVIO */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-zinc-800 rounded-2xl border border-zinc-700">
        <div className="mb-4 md:mb-0">
          <span className="text-zinc-400 block text-sm">Total da Venda</span>
          <span className="text-3xl font-black text-green-500">
            R${" "}
            {items
              .reduce((acc, item) => acc + Number(item.price || 0), 0)
              .toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-10 bg-green-600 hover:bg-green-500 active:scale-95 text-white font-black rounded-xl py-4 transition-all"
        >
          SALVAR VENDA
        </button>
      </div>
    </form>
  );
}

export default FormNewSale;
