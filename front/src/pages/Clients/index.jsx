import { useEffect, useMemo, useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext.jsx";

import Background from "../../components/Background";
import NavBar from "../../components/NavBar";
import ListTemplate from "../../components/ListTemplate";
import AddTemplate from "../../components/AddTemplate";
import Modal from "../../components/Modal";
import RowClient from "../../components/RowClient/index.jsx";
import TotalDebts from "../../components/TotalDebts/index.jsx";
import DebtorsToggle from "../../components/DebtorsToggle/index.jsx";

function Clients() {
  const {
    modal,
    setModal,
    error,
    setError,
    getAllClients,
    clientList,
    setClientList,
  } = useContext(ModalContext);

  const [clientForm, setClientForm] = useState({
    username: "",
    balance: 0,
  });

  const [selectedClient, setSelectedClient] = useState(null);

  const [filter, setFilter] = useState("");
  const [showOnlyDebtors, setShowOnlyDebtors] = useState(false);

  const filteredList = useMemo(() => {
    let list = clientList;

    if (showOnlyDebtors) {
      list = list.filter((client) => Number(client.balance) < 0);
    }

    if (!filter) return list;

    return list.filter((client) =>
      client.username.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, clientList, showOnlyDebtors]);

  async function addClient(data) {
    try {
      const token = sessionStorage.getItem("token");

      if (!data.username.trim()) {
        return setError(true);
      }

      const response = await fetch("http://localhost:8000/addClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      await getAllClients();
      setClientForm({ username: "" });
      setModal(null);
      setError(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateClient(data) {
    try {
      const token = sessionStorage.getItem("token");

      if (!data.username.trim() || data.balance === "") {
        return setError(true);
      }

      const response = await fetch("http://localhost:8000/updateClient", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      await getAllClients();
      setModal(null);
      setError(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteClient(data) {
    try {
      const token = sessionStorage.getItem("token");

      if (!data?.id) return;

      const response = await fetch("http://localhost:8000/deleteClient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: data.id }),
      });

      if (response.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete client");
      }

      await getAllClients();
      setModal(null);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <Background>
      <NavBar />
      {modal && (
        <Modal
          setError={setError}
          error={error}
          setClientForm={setClientForm}
          clientForm={clientForm}
          setModal={setModal}
          modal={modal}
          addClient={addClient}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          updateClient={updateClient}
          deleteClient={deleteClient}
        ></Modal>
      )}
      <AddTemplate
        setModal={setModal}
        name={"cliente"}
        filter={filter}
        setFilter={setFilter}
        add={"add-client"}
      >
        <DebtorsToggle
          active={showOnlyDebtors}
          setActive={setShowOnlyDebtors}
        />
      </AddTemplate>
      <ListTemplate columnName1={"Nome"} columnName2={"Saldo"}>
        {filteredList.map((client) => {
          return (
            <RowClient
              setModal={setModal}
              setSelectedClient={setSelectedClient}
              key={client.id}
              client={client}
            />
          );
        })}
      </ListTemplate>
      <TotalDebts clients={clientList} />
    </Background>
  );
}

export default Clients;
