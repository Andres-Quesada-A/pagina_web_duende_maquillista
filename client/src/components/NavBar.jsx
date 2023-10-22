import { Cart } from "./Icons";
import Logo from "../images/logo.png";

const OPTIONS = [
  {
    name: "Inicio",
    link: "/",
  },
  {
    name: "Sobre mí",
    link: "/about-us",
  },
  {
    name: "Galería",
    link: "/gallery",
  },
  {
    name: "Tienda de Duende",
    link: "/shop",
  },
  {
    name: "Iniciar sesión",
    link: "/login",
  },
];

function NavBar() {
  return (
    <nav className="h-16 w-full bg-gray-800 z-50 fixed top-0">
      <div className="flex flex-nowrap h-16 w-full max-w-5xl justify-between items-center px-5 mx-auto">
        <img src={Logo} className="h-12" />
        <div className="flex flex-nowrap gap-8 items-center">
          {OPTIONS.map(({ name, link }, index) => (
            <a
              key={index}
              href={link}
              className="text-white hover:text-indigo-400 transition-colors uppercase"
            >
              {name}
            </a>
          ))}
          <Cart className="text-indigo-400 hover:text-indigo-500 transition-colors" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
