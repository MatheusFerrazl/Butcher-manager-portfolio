function RowCow({ item, setModal, cow, killCow, setSelectedCow }) {
  return (
    <tr className="hover:bg-white/10 sm:text-xl transition-colors duration-200">
      <td className="py-4 px-6 text-center opacity-80">{`${cow.number_tag}°`}</td>
      <td className="py-4 px-6 text-center opacity-80">{`${cow.weight} KG`}</td>
      <td className="py-4 px-6 text-center opacity-80">
        <div className="flex items-center gap-5 justify-center">
          <img
            className="h-5 cursor-pointer"
            src="/images/meat.png"
            alt="kill"
            onClick={() => {
              killCow(cow);
            }}
          />
          <img
            className="h-5 cursor-pointer"
            src="/images/edit.png"
            alt="edit"
            onClick={() => {
              setSelectedCow(cow);
              setModal("edit-cow");
            }}
          />
          <img
            className="h-5 cursor-pointer"
            src="/images/delete.png"
            alt="delete"
            onClick={() => {
              setSelectedCow(cow);
              setModal("delete-cow");
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default RowCow;
