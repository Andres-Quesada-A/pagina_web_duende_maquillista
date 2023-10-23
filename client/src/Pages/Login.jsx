import { useState } from "react";
import SwitchFormInputs from "../components/form/SwitchFormInputs";
import Image from "../images/imageLogin.png";
import { Login } from "../Structures/LoginStructure";
import { Helmet } from "react-helmet-async";
import axios from "axios"
import { toast } from "react-toastify";
import { messageSettings } from "../utils/messageSettings";
import {useNavigate} from 'react-router-dom'

function LoginPage() {
  const [data, setData] = useState({email: "Andres@gmail.com", password: "1234Hello"});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:1234/api/login/${data.email}/${data.password}`)
      navigate('/')
    } catch (error) {
      toast.error("Algo ha salido mal", messageSettings)
    }
  };
  return (
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
        <meta
          name="description"
          content="Inicie sesion en nuestro sistema y tenga acceso a nuestros productos y servicios"
        />
        <link rel="canonical" href="/login" />
      </Helmet>
      <section className="min-h-screen bg-indigo-50 md:bg-white relative overflow-hidden py-5 px-5 flex justify-center items-center">
        <div className="bg-indigo-400 w-[120%] h-full rounded-[50%] hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-indigo-500 w-[120%] h-full rounded-[50%] hidden md:flex mt-10"></div>
        </div>
        <div className="w-[800px] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.10)] px-5 sm:px-10 py-10 relative rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          <picture className="hidden md:grid items-center">
            <img src={Image} alt="imagen" className="w-full" />
          </picture>
          <div>
            <h1 className="text-4xl text-indigo-500 font-bold text-center mb-8">
              Iniciar Sesión
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <SwitchFormInputs
                HandleChange={handleChange}
                structureForm={Login}
              />
              <a
                href="/forgot-password"
                className="cursor-pointer text-lg font-medium text-gray-600 hover:text-indigo-500 transition-colors"
              >
                ¿Olvidó la contraseña?
              </a>
              <button className="w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors text-white py-2 text-lg font-medium">
                Iniciar Sesión
              </button>
              <div className="text-base flex gap-5 items-center flex-nowrap mt-7">
                <p>¿No tienes una cuenta?</p>
                <a
                  href="/register"
                  className="cursor-pointer text-indigo-500 hover:text-indigo-400 transition-colors  font-medium text-lg text-medium"
                >
                  Registrarse
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
