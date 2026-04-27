import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const [error, setError] = useState(null);

  const [meatList, setMeatList] = useState([]);

  async function getAllMeats() {
    try {
      const token = sessionStorage.getItem("token");

      const request = await fetch("http://localhost:8000/meats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await request.json();
      setMeatList(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [clientList, setClientList] = useState([]);

  async function getAllClients() {
    try {
      const token = sessionStorage.getItem("token");

      const request = await fetch("http://localhost:8000/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      const clients = await request.json();
      setClientList(clients);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
        error,
        setError,
        getAllMeats,
        meatList,
        setMeatList,
        getAllClients,
        clientList,
        setClientList,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
