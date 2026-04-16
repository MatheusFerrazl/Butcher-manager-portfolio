function RowMeat({ item, setModal, setSelectedItem }) {
  return (
    <tr className="hover:bg-white/10 sm:text-xl transition-colors duration-200">
      <td className="py-4 px-6 text-center opacity-80">{item.name}</td>
      <td className="py-4 px-6 text-center opacity-80">{`R$ ${Number(item.price).toFixed(2)}`}</td>
      <td className="py-4 px-6 text-center opacity-80">
        <div className="flex items-center gap-7 justify-center">
          <img
            className="h-5 cursor-pointer"
            src="/images/edit.png"
            alt="edit"
            onClick={() => {
              setSelectedItem(item);
              setModal("edit-meat");
            }}
          />
          <img
            className="h-5 cursor-pointer"
            src="/images/delete.png"
            alt="delete"
            onClick={() => {
              setSelectedItem(item);
              setModal("delete-meat");
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default RowMeat;
