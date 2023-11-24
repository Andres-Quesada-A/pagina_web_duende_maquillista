import { Cart, CloseIcon, MenuIcon, UserIcon } from "./Icons";
import Logo from "../images/logo.png";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import Notifications from "./Notifications";

const OPTIONS = {
  client: [
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
  ],
  admin: [
    {
      name: "Inicio",
      link: "/",
    },
    {
      name: "Órdenes",
      link: "/orders",
    },
    {
      name: "Galería",
      link: "/gallery",
    },
    {
      name: "Tienda",
      link: "/shop",
    },
    {
      name: "Agenda",
      link: "/schedule",
    },
  ],
};
function NavBar() {
  const { cartQuantity } = useShoppingCart();
  const { getLoginStatus, getUserType } = useAuthContext();
  const navigate = useNavigate();
  const LoginStatus = getLoginStatus();
  const [open, setOpen] = useState(false);

  const TypeUser = getUserType();
  return (
    <nav className="h-16 w-full bg-gray-800 z-50 fixed top-0">
      <div className="flex flex-nowrap h-16 w-full max-w-6xl justify-between items-center px-5 mx-auto ">
        <img src={Logo} className="h-12" />
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer flex lg:hidden"
        >
          {open ? (
            <CloseIcon className="w-10 h-10 text-white" />
          ) : (
            <MenuIcon className="w-10 h-10 text-white" />
          )}
        </div>
        <div
          className={`transition-all fixed lg:static top-16 lg:top-0 -pt-16 bg-white/90 w-full ${
            open ? "right-0" : "right-full"
          } lg:right-0 lg:bg-transparent h-screen lg:h-16 flex-col lg:flex-row justify-center lg:justify-end flex flex-nowrap gap-8 items-center px-3`}
        >
          {TypeUser
            ? OPTIONS.admin.map(({ name, link }, index) => (
                <a
                  key={index}
                  href={link}
                  onClick={() => setOpen(!open)}
                  className="font-medium lg:font-normal text-xl lg:text-lg text-black lg:text-white hover:text-indigo-400 transition-colors uppercase"
                >
                  {name}
                </a>
              ))
            : OPTIONS.client.map(({ name, link }, index) => (
                <a
                  key={index}
                  href={link}
                  onClick={() => setOpen(!open)}
                  className="font-medium lg:font-normal text-xl lg:text-lg text-black lg:text-white hover:text-indigo-400 transition-colors uppercase"
                >
                  {name}
                </a>
              ))}
          {LoginStatus ? (
            <a
              href="/profile"
              onClick={() => setOpen(!open)}
              className="text-black lg:text-white hover:text-indigo-400 transition-colors uppercase"
            >
              <UserIcon className="w-10 h-10 text-indigo-400 hover:text-indigo-500 transition-colors" />
            </a>
          ) : (
            <a
              href={`/login?afterUrl=${encodeURIComponent(
                window.location.pathname
              )}`}
              onClick={() => setOpen(!open)}
              className="font-medium lg:font-normal text-xl lg:text-lg text-black lg:text-white hover:text-indigo-400 transition-colors uppercase"
            >
              Iniciar sesión
            </a>
          )}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              navigate("/shoppingCart");
              setOpen(!open);
            }}
          >
            <Cart className="text-indigo-400 hover:text-indigo-500 transition-colors" />
            {cartQuantity != 0 && (
              <div className=" -bottom-1 left-0 absolute w-5 h-5 text-white text-xs font-medium rounded-full bg-green-500 flex justify-center items-center">
                {cartQuantity}
              </div>
            )}
          </div>
          {LoginStatus && <Notifications />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
