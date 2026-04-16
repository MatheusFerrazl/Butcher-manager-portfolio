function AddTemplate({ name, filter, setFilter, setModal, add, children }) {
  return (
    <div className="w-[90%] sm:w-2/3 mx-auto mt-8 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800 shadow-lg">
        
        {/* Botão Adicionar */}
        <button
          onClick={() => setModal(add)}
          className="flex items-center justify-center gap-3 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm uppercase tracking-wider active:scale-95 shadow-lg shadow-red-900/20"
        >
          <img className="size-4 brightness-0 invert" src="/images/add.png" alt="+" />
          <span className="whitespace-nowrap">Adicionar {name}</span>
        </button>

        {/* ESPAÇO PARA O TOGGLE (Só aparece se você passar ele) */}
        {children && (
          <div className="w-full sm:w-auto border-x border-zinc-800 px-4">
            {children}
          </div>
        )}

        {/* Barra de Busca */}
        <div className="flex flex-1 gap-3 items-center w-full bg-zinc-950/50 rounded-xl px-4 py-2 border border-zinc-700/50 focus-within:border-red-500/50 transition-all">
          <img className="size-4 opacity-50" src="/images/search.png" alt="Lupa" />
          <input
            className="bg-transparent w-full focus:outline-none text-sm text-white placeholder:text-zinc-500"
            value={filter}
            type="text"
            placeholder={`Buscar ${name.toLowerCase()}...`}
            autoComplete="off"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default AddTemplate;