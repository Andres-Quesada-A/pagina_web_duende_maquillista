import { useState } from "react";
import SwitchFormInputs from "../components/form/SwitchFormInputs";
import Image from "../images/imageLogin.png";
import { Register } from "../Structures/LoginStructure";
import { Helmet } from "react-helmet-async";
import axios from "axios"

function RegisterPage() {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:1234/api/register_user`, data)
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <>
      <Helmet>
        <title>Crear una cuenta</title>
        <meta
          name="description"
          content="Cree una cuenta para que pueda acceder a nuestros servicios"
        />
        <link rel="canonical" href="/register" />
      </Helmet>
      <section className="h-screen bg-indigo-50 md:bg-white relative overflow-hidden py-5 px-5 flex justify-center items-center">
        <div className="bg-indigo-400 w-[120%] h-full rounded-[50%] hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-indigo-500 w-[120%] h-full rounded-[50%] hidden md:flex mt-10"></div>
        </div>
        <div className="w-[800px] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.10)] px-5 sm:px-10 py-10 relative rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          <picture className="hidden md:grid items-center">
            <img src={Image} alt="imagen" className="w-full" />
          </picture>
          <div>
            <h1 className="text-4xl text-indigo-500 font-bold text-center mb-8">
              Crear cuenta
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <SwitchFormInputs
                HandleChange={handleChange}
                structureForm={Register}
              />
              <button className="mt-5 w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors text-white py-2 text-lg font-medium">
                Registrarse
              </button>
              <div className="text-base flex gap-5 items-center flex-nowrap mt-7">
                <p>¿Ya tienes una cuenta?</p>
                <a
                  href="/login"
                  className="cursor-pointer text-indigo-500 hover:text-indigo-400 transition-colors  font-medium text-lg text-medium"
                >
                  Iniciar sesión
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
