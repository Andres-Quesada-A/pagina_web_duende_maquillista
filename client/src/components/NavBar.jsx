import { Cart, UserIcon } from "./Icons";
import Logo from "../images/logo.png";
import { useShoppingCart } from "../context/ShoppingCartContext";
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";

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
  }
];

function NavBar() {
  const {cartQuantity} = useShoppingCart()
  const {getLoginStatus} = useAuthContext()
  const navigate = useNavigate();
  const LoginStatus = getLoginStatus()

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
          {
            LoginStatus ? (
              <a
              href="/profile"
              className="text-white hover:text-indigo-400 transition-colors uppercase"
            >
              <UserIcon className="w-10 h-10 text-indigo-400 hover:text-indigo-500 transition-colors" />
            </a>
            ): (
              <a
              href="/login"
              className="text-white hover:text-indigo-400 transition-colors uppercase"
            >
              Iniciar sesión
            </a>
            )
          }
          <div className="relative cursor-pointer" onClick={()=> navigate("/shoppingCart")}>
            <Cart className="text-indigo-400 hover:text-indigo-500 transition-colors" />
            {cartQuantity != 0 && <div className=" -bottom-1 left-0 absolute w-5 h-5 text-white text-xs font-medium rounded-full bg-green-500 flex justify-center items-center">{cartQuantity}</div>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
