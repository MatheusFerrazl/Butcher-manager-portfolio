
function CowList({children, margin}) {
  return (
    <div className={`overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-9/10 sm:w-1/2 ${margin} mx-auto`}>
      <table className="w-full text-white bg-white/5 backdrop-blur-sm border-collapse">
        <thead>
          <tr className="bg-white/10 border-b border-white/20">
            <th className="py-4 px-6 text-center text-xl uppercase tracking-widest font-normal">
                número
            </th>
            <th className="py-4 px-6 text-center text-xl uppercase tracking-widest font-normal">
              peso
            </th>
             <th className="py-4 px-6 text-center text-xl uppercase tracking-widest font-normal">
              ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {children}
        </tbody>
      </table>
    </div>
  )
}

export default CowList;
