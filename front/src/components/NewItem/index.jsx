function NewItem({meatList}) {
  return (
    <div className="flex flex-col gap-2">
      <h2>item</h2>
      <div className="flex w-full mb-4 gap-2">
        <select
          className="flex pl-2 appearance-none rounded-md w-full h-10 bg-zinc-700"
          name=""
          id=""
        >
          <option value="" defaultValue>
            carne
          </option>
          {meatList.map((item) => {
            return (
              <option key={item.id} item={item}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          className="rounded-md w-full h-10 pl-2 bg-zinc-700"
          type="number"
          placeholder="kg"
        />
        <input
          className="rounded-md w-full h-10 pl-2 bg-zinc-700"
          type="number"
          placeholder="valor"
        />
      </div>
    </div>
  );
}

export default NewItem;
