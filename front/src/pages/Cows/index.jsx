import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext.jsx";

import Background from "../../components/Background";
import NavBar from "../../components/NavBar";
import CowList from "../../components/CowsList";
import RowCow from "../../components/RowCow";
import AddTemplate from "../../components/AddTemplate";
import Modal from "../../components/Modal/index.jsx";

function Cows() {
  const { modal, setModal, error, setError } = useContext(ModalContext);

  const [cowForm, setCowForm] = useState({
    numberTag: "",
    weight: "",
    supplier: "",
    description: "",
  });

  const [selectedCow, setSelectedCow] = useState(null);
  const [cowList, setCowList] = useState([]);

  // 🔥 NOVO: estado do filtro
  const [filter, setFilter] = useState("");

  async function addCow(data) {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch("https://butcher-manager.onrender.com/addCow", {
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

      await getAllCows();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCow(data) {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch("https://butcher-manager.onrender.com/updateCow", {
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

      await getAllCows();
    } catch (error) {
      console.log(error);
    }
  }

  async function killCow(data) {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch("https://butcher-manager.onrender.com/killCow", {
        method: "PATCH",
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

      await getAllCows();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCow(data) {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch("https://butcher-manager.onrender.com/deleteCow", {
        method: "DELETE",
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

      await getAllCows();
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCows() {
    try {
      const token = sessionStorage.getItem("token");

      const request = await fetch("https://butcher-manager.onrender.com/cows", {
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

      const data = await request.json();
      setCowList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCows();
  }, []);

  // 🔥 NOVO: lista filtrada
  const filteredCows = cowList.filter((cow) =>
    cow.number_tag?.toString().toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <Background>
        <NavBar />

        {modal && (
          <Modal
            modal={modal}
            cowForm={cowForm}
            setCowForm={setCowForm}
            setModal={setModal}
            error={error}
            setError={setError}
            selectedCow={selectedCow}
            setSelectedCow={setSelectedCow}
            updateCow={updateCow}
            deleteCow={deleteCow}
            addCow={addCow}
          />
        )}

        {/* 🔥 AGORA COM FILTRO */}
        <AddTemplate
          name={"vaca"}
          setModal={setModal}
          add={"add-cow"}
          filter={filter}
          setFilter={setFilter}
        />

        {/* VIVAS */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-white text-2xl mt-8 font-light uppercase tracking-widest border-b border-green-500/50 pb-1 w-9/10 sm:w-1/2">
            vivas
          </h2>

          {filteredCows.filter((cow) => cow.is_alive).length > 0 ? (
            <CowList margin={"mt-4"}>
              {filteredCows
                .filter((cow) => cow.is_alive === true)
                .map((cow) => (
                  <RowCow
                    key={cow.id}
                    cow={cow}
                    killCow={killCow}
                    setSelectedCow={setSelectedCow}
                    setModal={setModal}
                  />
                ))}
            </CowList>
          ) : (
            <div className="text-white/30 italic mt-6 tracking-widest uppercase text-sm">
              — sem vacas vivas —
            </div>
          )}

          {/* ABATIDAS */}
          <h2 className="text-white text-2xl mt-12 font-light uppercase tracking-widest border-b border-red-500/50 pb-1 w-9/10 sm:w-1/2">
            abatidas
          </h2>

          {filteredCows.filter((cow) => !cow.is_alive).length > 0 ? (
            <CowList margin={"mt-4"}>
              {filteredCows
                .filter((cow) => cow.is_alive === false)
                .map((cow) => (
                  <RowCow
                    key={cow.id}
                    cow={cow}
                    killCow={killCow}
                    setSelectedCow={setSelectedCow}
                    setModal={setModal}
                  />
                ))}
            </CowList>
          ) : (
            <div className="text-white/30 italic mt-6 tracking-widest uppercase text-sm mb-10">
              — sem vacas abatidas —
            </div>
          )}
        </div>
      </Background>
    </>
  );
}

export default Cows;
