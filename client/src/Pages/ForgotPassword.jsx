import { useContext, useState, useEffect } from "react";
import SwitchFormInputs from "../components/form/SwitchFormInputs";
import { ForgotPassword } from "../Structures/LoginStructure";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import {messageSettings, defaultError} from '../utils/messageSettings'
import {AuthContext} from "../context/AuthContext"

function ForgotPasswordPage() {
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const afterUrl = queryParams.get('afterUrl') || '/';
  const encodedAfterUrl = encodeURIComponent(afterUrl);
  const { getLoginStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const redirect = () => {
    window.location = afterUrl;
  }

  useEffect(() => {
    if (getLoginStatus()) {
      redirect();
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/request_password_reset/${data.email}`)
      toast.success("Código enviado al correo.", messageSettings)
      setDisabled(false)
    } catch (error) {
      console.log(error)
      const errorMessage =
          error?.response?.data?.message ||
          defaultError;
      toast.error(errorMessage, messageSettings);
    }
    
  };
  return (
    <>
      <Helmet>
        <title>Recuperar contraseña</title>
        <meta
          name="description"
          content="Proceso para la recuperación de contraseña"
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
              <button disabled={disabled} onClick={() => navigate(`/change-password?afterUrl=${encodedAfterUrl}`)} className="mt-5 w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors text-white py-2 text-lg font-medium">
                Siguiente paso
              </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPasswordPage;
