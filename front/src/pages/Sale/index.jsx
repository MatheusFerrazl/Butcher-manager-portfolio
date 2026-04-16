import { useEffect, useMemo, useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext.jsx";

import Background from "../../components/Background";
import NavBar from "../../components/NavBar";
import FormNewSale from "../../components/FormNewSale";
import FormNewLoss from "../../components/FormNewLoss/index.jsx";


function Sale() {

  const {
    modal,
    setModal,
    error,
    setError,
    getAllMeats,
    meatList,
    setMeatList,
    getAllClients,
    clientList,
    setClientList
  } = useContext(ModalContext);

  useEffect(() => {
    getAllMeats();
    getAllClients();
  }, [])

  return (
    <Background>
      <NavBar />
      <FormNewSale meatList={meatList} clientList={clientList} />
      <FormNewLoss/>
    </Background>
  );
}

export default Sale;
