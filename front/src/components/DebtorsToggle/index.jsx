function DebtorsToggle({ active, setActive }) {
  return (
    <button
      type="button"
      onClick={() => setActive(!active)}
      className={`flex items-center gap-3 transition-all duration-300 ${active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
    >
      <div
        className={`relative w-10 h-5 rounded-full flex items-center px-1 transition-colors ${active ? "bg-red-600" : "bg-zinc-700"}`}
      >
        <div
          className={`size-3 bg-white rounded-full transition-transform ${active ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-zinc-300 uppercase whitespace-nowrap">
        {active ? "Devedores" : "Todos"}
      </span>
    </button>
  );
}
export default DebtorsToggle;
