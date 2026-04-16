import { useState } from "react";

function Modal({
  setModal,
  modal,
  meatForm,
  setMeatForm,
  clientForm,
  setClientForm,
  error,
  setError,
  addMeat,
  selectedItem,
  setSelectedItem,
  selectedClient,
  setSelectedClient,
  deleteMeat,
  updateMeat,
  addClient,
  updateClient,
  deleteClient,
  cowForm,
  setCowForm,
  selectedCow,
  setSelectedCow,
  addCow,
  updateCow,
  deleteCow,
}) {
  const [editedItem, setEditedItem] = useState({
    id: selectedItem ? selectedItem.id : "",
    name: selectedItem ? selectedItem.name : "",
    price: selectedItem ? selectedItem.price : "",
  });

  const [editedClient, setEditedClient] = useState({
    id: selectedClient ? selectedClient.id : "",
    username: selectedClient ? selectedClient.username : "",
    balance: selectedClient ? selectedClient.balance : "",
  });

  const [editedCow, setEditedCow] = useState({
    id: selectedCow ? selectedCow.id : "",
    number_tag: selectedCow ? selectedCow.number_tag : "",
    description: selectedCow ? selectedCow.description : "",
    supplier: selectedCow ? selectedCow.supplier : "",
    weight: selectedCow ? selectedCow.weight : "",
  });

  return (
    <div className="fixed text-white inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => {
          setError(false);
          setModal(null);
        }}
      ></div>
      <div
        className="
        relative
        z-10
        w-[92%]
        max-w-md
        p-8
        rounded-3xl
        bg-linear-to-b from-zinc-900 to-zinc-800
        border border-zinc-700/50
        shadow-[0_25px_80px_rgba(0,0,0,0.8)]
        animate-[fadeIn_.2s_ease]
      "
      >
        <div className="relative flex items-center mb-6">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-lg tracking-wide">
            {modal === "add-meat" && "adicionar carne"}
            {modal === "edit-meat" && "editar carne"}
            {modal === "delete-meat" && "deletar carne"}
            {modal === "add-client" && "adicionar cliente"}
            {modal === "edit-client" && "editar cliente"}
            {modal === "delete-client" && "deletar cliente"}
            {modal === "add-cow" && "adicionar vaca"}
            {modal === "edit-cow" && "editar vaca"}
            {modal === "delete-cow" && "deletar vaca"}
          </h2>

          <button
            className="
              ml-auto text-2xl
              hover:text-red-500
              transition duration-200
              cursor-pointer
            "
            onClick={() => {
              setModal(null);
            }}
          >
            ×
          </button>
        </div>

        <div className="w-full h-0.5 bg-zinc-700 mb-6" />

        {/* ADD */}
        {modal === "add-meat" && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-sm text-zinc-400">Nome</label>
              <input
                id="name"
                name="name"
                className="
                  mt-2 w-full p-3 rounded-xl
                  bg-zinc-800 border border-zinc-700
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/30
                  outline-none transition
                "
                type="text"
                value={meatForm.name ?? ""}
                onChange={(e) => {
                  const { name } = e.target;
                  setMeatForm((prev) => ({ ...prev, [name]: e.target.value }));
                }}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Preço</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={modal === "add-meat" ? meatForm.price : ""}
                className="
                  mt-2 w-full p-3 rounded-xl
                  bg-zinc-800 border border-zinc-700
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/30
                  outline-none transition
                "
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const { name } = e.target;
                  const value = parseFloat(e.target.value);
                  setMeatForm((prev) => ({
                    ...prev,
                    [name]: isNaN(value) ? "" : value,
                  }));
                }}
              />
            </div>
            <div className="h-4 text-center text-red-600">
              {error && "todos os campos devem ser preenchidos"}
            </div>

            <button
              className="
                mt-2
                py-3
                rounded-xl
                bg-linear-to-r from-green-600 to-green-700
                hover:from-green-700 hover:to-green-800
                shadow-lg hover:shadow-green-500/30
                transition
              "
              onClick={() => addMeat(meatForm)}
            >
              Adicionar
            </button>
          </div>
        )}

        {/* EDIT */}
        {modal === "edit-meat" && (
          <div className="flex flex-col gap-6">
            {/* INFO */}
            <div className="text-center">
              <p className="text-sm text-zinc-400">Editando:</p>
              <p className="mt-1 text-lg text-red-400 font-semibold">
                "{selectedItem.name}"
              </p>
            </div>

            {/* INPUT NOME */}
            <div>
              <label className="text-sm text-zinc-400">Nome</label>
              <input
                type="text"
                value={editedItem.name ?? ""}
                onChange={(e) =>
                  setEditedItem((prev) => ({ ...prev, name: e.target.value }))
                }
                className="
        mt-2 w-full p-3 rounded-xl
        bg-zinc-800 border border-zinc-700
        focus:border-red-500 focus:ring-2 focus:ring-red-500/30
        outline-none transition
      "
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Preço</label>
              <input
                type="number"
                step="0.01"
                value={editedItem.price ?? ""}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setEditedItem((prev) => ({
                    ...prev,
                    price: e.target.value ? parseFloat(e.target.value) : "",
                  }));
                }}
                className="
        mt-2 w-full p-3 rounded-xl
        bg-zinc-800 border border-zinc-700
        focus:border-red-500 focus:ring-2 focus:ring-red-500/30
        outline-none transition
      "
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="
        flex-1 py-3 rounded-xl
        bg-zinc-700 hover:bg-zinc-600
        transition"
                onClick={() => {
                  setModal(null);
                  setSelectedItem(null);
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  updateMeat(editedItem);
                  setModal(null);
                }}
                className="
        flex-1 py-3 rounded-xl
        bg-yellow-600 hover:bg-yellow-700
        shadow-lg hover:shadow-yellow-500/30"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        )}

        {/* DELETE */}
        {modal === "delete-meat" && (
          <div className="flex flex-col gap-8 items-center text-center">
            <div>
              <p className="text-lg">Tem certeza?</p>
              <p className="text-sm text-zinc-400 mt-2">
                Você está prestes a excluir:
              </p>
              <p className="mt-3 text-red-400  text-lg">
                "{selectedItem?.name}"
              </p>
            </div>

            <div className="flex w-full gap-4">
              <button
                className="
                  flex-1 py-3 rounded-xl
                  bg-zinc-700 hover:bg-zinc-600
                  transition
                "
                onClick={() => {
                  setModal(null);
                  setSelectedItem(null);
                }}
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  deleteMeat(selectedItem);
                }}
                className="
                  flex-1 py-3 rounded-xl
                  bg-red-600 hover:bg-red-700
                  shadow-lg hover:shadow-red-500/30
                  transition
                "
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
        {/* ADD-CLIENT */}
        {modal === "add-client" && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-sm text-zinc-400">Nome do Cliente</label>
              <input
                id="username-add"
                name="username"
                className="mt-2 w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500 transition"
                type="text"
                value={clientForm.username ?? ""}
                onChange={(e) =>
                  setClientForm((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>

            {error && (
              <div className="text-center text-red-600 text-sm">
                O nome é obrigatório
              </div>
            )}

            <button
              className="mt-2 py-3 rounded-xl bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition shadow-lg"
              onClick={() => addClient({ username: clientForm.username })}
            >
              Adicionar Cliente
            </button>
          </div>
        )}

        {/* EDIT-CLIENT */}
        {modal === "edit-client" && (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <p className="text-sm text-zinc-400">Alterar nome de:</p>
              <p className="mt-1 text-lg text-red-400 font-semibold">
                "{selectedClient.username}"
              </p>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Novo Nome</label>
              <input
                type="text"
                value={editedClient.username ?? ""}
                onChange={(e) =>
                  setEditedClient((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="mt-2 w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-yellow-500 transition"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                className="flex-1 py-3 rounded-xl bg-zinc-700"
                onClick={() => setModal(null)}
              >
                Cancelar
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition"
                onClick={() =>
                  updateClient({
                    id: editedClient.id,
                    username: editedClient.username,
                  })
                }
              >
                Salvar Alteração
              </button>
            </div>
          </div>
        )}
        {/* DELETE-CLIENT */}
        {modal === "delete-client" && (
          <div className="flex flex-col gap-8 items-center text-center">
            <div>
              <p className="text-lg font-semibold">Confirmar Exclusão?</p>
              <p className="text-sm text-zinc-400 mt-2">
                Atenção: Isso pode falhar se o cliente possuir vendas
                registradas no sistema.
              </p>
              <p className="mt-3 text-red-400 text-xl font-bold">
                "{selectedClient?.username}"
              </p>
            </div>

            <div className="flex w-full gap-4">
              <button
                className="flex-1 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition"
                onClick={() => {
                  setModal(null);
                  setSelectedClient(null);
                }}
              >
                Cancelar
              </button>

              <button
                onClick={() => deleteClient(selectedClient)}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-500/30 transition font-bold"
              >
                Excluir Permanentemente
              </button>
            </div>
          </div>
        )}
        {/* ADD-COW */}
        {modal === "add-cow" && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-sm text-zinc-400">número</label>
              <input
                id="number"
                name="number"
                className="
                  mt-2 w-full p-3 rounded-xl
                  bg-zinc-800 border border-zinc-700
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/30
                  outline-none transition
                "
                type="number"
                value={cowForm.numberTag}
                onChange={(e) => {
                  setCowForm((prev) => ({
                    ...prev,
                    numberTag: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">peso</label>
              <input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                value={cowForm.weight}
                className="
                  mt-2 w-full p-3 rounded-xl
                  bg-zinc-800 border border-zinc-700
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/30
                  outline-none transition
                "
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setCowForm((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">fornecedor</label>
              <input
                id="supplier"
                name="supplier"
                className="
                  mt-2 w-full p-3 rounded-xl
                  bg-zinc-800 border border-zinc-700
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/30
                  outline-none transition
                "
                type="text"
                value={cowForm.supplier}
                onChange={(e) => {
                  setCowForm((prev) => ({ ...prev, supplier: e.target.value }));
                }}
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Descrição</label>
              <textarea
                id="description"
                name="description"
                className="
                  mt-2 w-full p-3 rounded-xl
                  bg-zinc-800 border border-zinc-700
                  focus:border-red-500 focus:ring-2 focus:ring-red-500/30
                  outline-none transition
                "
                type="text"
                value={cowForm.description}
                onChange={(e) => {
                  setCowForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              className="
                mt-2
                py-3
                rounded-xl
                bg-linear-to-r from-green-600 to-green-700
                hover:from-green-700 hover:to-green-800
                shadow-lg hover:shadow-green-500/30
                transition
              "
              onClick={() => {
                addCow(cowForm);
                setModal(null)
              }}
            >
              Adicionar
            </button>
          </div>
        )}
        {/* EDIT-COW */}
        {modal === "edit-cow" && (
          <div className="flex flex-col gap-6">
            {/* INFO */}
            <div className="text-center">
              <p className="text-sm text-zinc-400">Editando a vaca número:</p>
              <p className="mt-1 text-lg text-red-400 font-semibold">
                "{selectedCow.number_tag}"
              </p>
            </div>

            {/* INPUT NOME */}
            <div>
              <label className="text-sm text-zinc-400">número</label>
              <input
                type="number"
                value={editedCow.number_tag ?? ""}
                onChange={(e) =>
                  setEditedCow((prev) => ({
                    ...prev,
                    number_tag: e.target.value,
                  }))
                }
                className="
        mt-2 w-full p-3 rounded-xl
        bg-zinc-800 border border-zinc-700
        focus:border-red-500 focus:ring-2 focus:ring-red-500/30
        outline-none transition
      "
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Peso</label>
              <input
                type="number"
                step="0.01"
                value={editedCow.weight ?? ""}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setEditedCow((prev) => ({
                    ...prev,
                    weight: e.target.value ? parseFloat(e.target.value) : "",
                  }));
                }}
                className="
        mt-2 w-full p-3 rounded-xl
        bg-zinc-800 border border-zinc-700
        focus:border-red-500 focus:ring-2 focus:ring-red-500/30
        outline-none transition
      "
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">fornecedor</label>
              <input
                type="text"
                value={editedCow.supplier ?? ""}
                onChange={(e) =>
                  setEditedCow((prev) => ({
                    ...prev,
                    supplier: e.target.value,
                  }))
                }
                className="
        mt-2 w-full p-3 rounded-xl
        bg-zinc-800 border border-zinc-700
        focus:border-red-500 focus:ring-2 focus:ring-red-500/30
        outline-none transition
      "
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">descrição</label>
              <textarea
                type="text"
                value={editedCow.description ?? ""}
                onChange={(e) =>
                  setEditedCow((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="
        mt-2 w-full p-3 rounded-xl
        bg-zinc-800 border border-zinc-700
        focus:border-red-500 focus:ring-2 focus:ring-red-500/30
        outline-none transition
      "
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="
        flex-1 py-3 rounded-xl
        bg-zinc-700 hover:bg-zinc-600
        transition"
                onClick={() => {
                  setModal(null);
                  setSelectedCow(null);
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  updateCow(editedCow);
                  setModal(null);
                }}
                className="
        flex-1 py-3 rounded-xl
        bg-yellow-600 hover:bg-yellow-700
        shadow-lg hover:shadow-yellow-500/30"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        )}

        {modal === "delete-cow" && (
          <div className="flex flex-col gap-8 items-center text-center">
            <div>
              <p className="text-lg">Tem certeza?</p>
              <p className="text-sm text-zinc-400 mt-2">
                Você está prestes a excluir a vaca número:
              </p>
              <p className="mt-3 text-red-400  text-lg">
                "{selectedCow?.number_tag}"
              </p>
            </div>

            <div className="flex w-full gap-4">
              <button
                className="
                  flex-1 py-3 rounded-xl
                  bg-zinc-700 hover:bg-zinc-600
                  transition
                "
                onClick={() => {
                  setModal(null);
                  setSelectedCow(null);
                }}
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  deleteCow(selectedCow);
                  setSelectedCow(null);
                  setModal(null);
                }}
                className="
                  flex-1 py-3 rounded-xl
                  bg-red-600 hover:bg-red-700
                  shadow-lg hover:shadow-red-500/30
                  transition
                "
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
