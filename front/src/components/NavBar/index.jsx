import Header from "../Header";
import { NavLink } from "react-router-dom";

function NavBar() {
  const navLinkStyles = ({ isActive }) =>
    `relative pb-2 transition-all duration-300 hover:text-red-400 uppercase tracking-wider font-medium text-sm sm:text-base ${
      isActive ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 border-b-2 border-transparent"
    }`;

  return (
    // Removido o 'sticky top-0' e o 'z-50'
    <header className="w-full border-b border-white/5 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo Centralizada */}
        <Header size={"h-28 sm:h-32"} />

        {/* Navegação */}
        <nav className="flex justify-center items-center pb-6">
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <li>
              <NavLink to="/lista-carnes" className={navLinkStyles}>
                Carnes
              </NavLink>
            </li>
            <li>
              <NavLink to="/lista-clientes" className={navLinkStyles}>
                Clientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/bois" className={navLinkStyles}>
                Bois
              </NavLink>
            </li>
            <li>
              <NavLink to="/venda" className={navLinkStyles}>
                Venda
              </NavLink>
            </li>
            <li>
              <NavLink to="/caixa" className={navLinkStyles}>
                Caixa
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;