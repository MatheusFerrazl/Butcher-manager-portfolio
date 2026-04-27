import { useEffect, useMemo, useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext.jsx";

import Background from "../../components/Background";
import NavBar from "../../components/NavBar";
import ListTemplate from "../../components/ListTemplate";
import RowMeat from "../../components/RowMeat";
import AddTemplate from "../../components/AddTemplate";
import Modal from "../../components/Modal";

function MeatList() {
  const {
    modal,
    setModal,
    error,
    setError,
    getAllMeats,
    meatList,
    setMeatList,
  } = useContext(ModalContext);

  const [meatForm, setMeatForm] = useState({
    name: "",
    price: "",
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const [filter, setFilter] = useState("");

  const filteredList = useMemo(() => {
    if (!filter) return meatList;

    return meatList.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, meatList]);

  async function addMeat(data) {
    try {
      const token = sessionStorage.getItem("token");

      if (!data.name.trim() || data.price === "" || data.price <= 0) {
        return setError(true);
      }

      await fetch("http://localhost:8000/addMeat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      await getAllMeats();

      setMeatForm({ name: "", price: "" });
      setModal(null);
      setError(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateMeat(data) {
  try {
    const token = sessionStorage.getItem("token");

    if (!data.name.trim() || data.price === "" || data.price <= 0) {
      return setError(true);
    }

    const response = await fetch("http://localhost:8000/updateMeat", {
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

    await getAllMeats();
    setModal(null);
    setError(false);
  } catch (error) {
    console.log(error);
  }
}

  async function deleteMeat(data) {
  try {
    const token = sessionStorage.getItem("token");

    if (!data?.id) return;

    const response = await fetch("http://localhost:8000/deleteMeat", {
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

    if (!response.ok) {
      throw new Error("Failed to delete meat");
    }

    await getAllMeats();
    setModal(null);
    setError(false);
  } catch (error) {
    console.error(error);
    setError(true);
  }
}

  useEffect(() => {
    getAllMeats();
  }, []);

  return (
    <Background>
      <NavBar />
      {modal && (
        <Modal
          updateMeat={updateMeat}
          deleteMeat={deleteMeat}
          addMeat={addMeat}
          setError={setError}
          error={error}
          meatForm={meatForm}
          setMeatForm={setMeatForm}
          modal={modal}
          setModal={setModal}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        ></Modal>
      )}
      <AddTemplate
        setModal={setModal}
        setFilter={setFilter}
        name={"carne"}
        add={"add-meat"}
      />
      <ListTemplate columnName1={"carne"} columnName2={"preço/KG"}>
        {filteredList.map((item) => {
          return (
            <RowMeat
              key={item.id}
              item={item}
              setModal={setModal}
              setSelectedItem={setSelectedItem}
            />
          );
        })}
      </ListTemplate>
    </Background>
  );
}

export default MeatList;
