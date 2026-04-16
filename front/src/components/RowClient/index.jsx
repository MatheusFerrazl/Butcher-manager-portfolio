function RowClient({ client, setModal, setSelectedClient }) {
  return (
    <tr className="hover:bg-white/10 sm:text-xl transition-colors duration-200">
      <td className="py-4 px-6 text-center opacity-80">{client.username}</td>
      <td className={`${Number(client.balance) >= 0 ? "text-green-500" : "text-red-500"} py-4 px-6 text-center opacity-80`}>{`R$ ${Number(client.balance).toFixed(2)}`}</td>
      <td className="py-4 px-6 text-center opacity-80">
        <div className="flex items-center gap-7 justify-center">
          <img
            className="h-5 cursor-pointer"
            src="/images/edit.png"
            alt="edit"
            onClick={() => {
              setSelectedClient(client);
              setModal("edit-client");
            }}
          />
          <img
            className="h-5 cursor-pointer"
            src="/images/delete.png"
            alt="delete"
            onClick={() => {
              setSelectedClient(client);
              setModal("delete-client");
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default RowClient;
