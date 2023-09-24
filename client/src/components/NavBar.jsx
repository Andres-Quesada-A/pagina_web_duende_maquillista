import { Cart } from "./Icons";
import Logo from "../images/logo.png";

function NavBar() {
  return (
    <nav className="h-16 w-full bg-gray-800 z-50 fixed top-0">
      <div className="flex flex-nowrap h-16 w-full max-w-5xl justify-between items-center px-5 mx-auto">
        <img src={Logo} className="h-12" />
        <div className="flex flex-nowrap gap-8 items-center">
          <a
            href="/"
            className="text-white hover:text-indigo-400 transition-colors"
          >
            INICIO
          </a>
          <a
            href="/about-us"
            className="text-white hover:text-indigo-400 transition-colors"
          >
            SOBRE MÍ
          </a>
          <a
            href="/gallery"
            className="text-white hover:text-indigo-400 transition-colors"
          >
            GALERÍA
          </a>
          <a
            href="/shop"
            className="text-white hover:text-indigo-400 transition-colors"
          >
            TIENDA DE DUENDE
          </a>
          <a
            href="/login"
            className="text-white hover:text-indigo-400 transition-colors"
          >
            INICIAR SESIÓN
          </a>
          <Cart className="text-indigo-400 hover:text-indigo-500 transition-colors" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
