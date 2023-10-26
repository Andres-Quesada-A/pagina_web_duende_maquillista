import { useState } from "react";
import SwitchFormInputs from "../components/form/SwitchFormInputs";
import { ForgotPassword } from "../Structures/LoginStructure";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import {messageSettings} from '../utils/messageSettings'

function ForgotPasswordPage() {
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:1234/api/request_password_reset/${data.email}`)
      toast.success("Código enviado al correo", messageSettings)
      setDisabled(false)
    } catch (error) {
      console.log(error)
      toast.error("Algo ha salido mal", messageSettings)
    }
    
  };
  return (
    <>
      <Helmet>
        <title>Recuperar contraseña</title>
        <meta
          name="description"
          content="Proceso para la recuperacion de contrasena"
        />
        <link rel="canonical" href="/forgot-password" />
      </Helmet>
      <section className="h-screen bg-indigo-50 md:bg-white relative overflow-hidden py-5 px-5 flex justify-center items-center">
        <div className="bg-indigo-400 w-[120%] h-full rounded-[50%] hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-indigo-500 w-[120%] h-full rounded-[50%] hidden md:flex mt-10"></div>
        </div>
        <div className="w-[400px] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.10)] px-5 sm:px-10 py-10 relative rounded-lg grid grid-cols-1">
          <div>
            <h1 className="text-2xl text-indigo-500 font-bold text-center mb-8">
              Recuperar contraseña
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <SwitchFormInputs
                HandleChange={handleChange}
                structureForm={ForgotPassword}
              />
              <button className="mt-5 w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors text-white py-2 text-lg font-medium">
                Enviar código
              </button>
            </form>
              <button disabled={disabled} onClick={() => navigate("/change-password")} className="mt-5 w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors text-white py-2 text-lg font-medium">
                Siguiente paso
              </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPasswordPage;
