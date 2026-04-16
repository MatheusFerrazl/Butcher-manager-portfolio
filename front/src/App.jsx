import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext.jsx";

import Login from "./pages/Login";
import MeatList from "./pages/MeatList";
import Clients from "./pages/Clients";
import Sale from "./pages/Sale";
import Balance from "./pages/Balance";
import PrivateRoute from "./router/PrivateRoute.jsx";
import Cows from "./pages/Cows/index.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/lista-carnes"
            element={
              <PrivateRoute>
                <ModalProvider>
                  <MeatList />
                </ModalProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-clientes"
            element={
              <PrivateRoute>
                <ModalProvider>
                  <Clients />
                </ModalProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/bois"
            element={
              <PrivateRoute>
                <ModalProvider>
                  <Cows />
                </ModalProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/venda"
            element={
              <PrivateRoute>
                <ModalProvider>
                  <Sale />
                </ModalProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/caixa"
            element={
              <PrivateRoute>
                <ModalProvider>
                  <Balance />
                </ModalProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
