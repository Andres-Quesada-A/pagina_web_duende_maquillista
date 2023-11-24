import { useContext, useEffect, useState } from "react";
import SwitchFormInputs from "../components/form/SwitchFormInputs";
import Image from "../images/imageLogin.png";
import { Login } from "../Structures/LoginStructure";
import { Helmet } from "react-helmet-async";
import axios from "axios"
import { toast } from "react-toastify";
import { messageSettings, defaultError } from "../utils/messageSettings";
import {useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"

function LoginPage() {
  const queryParams = new URLSearchParams(location.search);
  const afterUrl = queryParams.get('afterUrl') || '/';
  const encodedAfterUrl = encodeURIComponent(afterUrl);
  const [data, setData] = useState({email: "", password: ""});
  const { getLoginStatus, dispatch } = useContext(AuthContext);
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
      //await axios.post(`/api/login/${data.email}/${data.password}`, undefined, { withCredentials: true })
      const response = await axios.post(`/api/login/${data.email}/${data.password}`, undefined, { withCredentials: true })
      // const response = await axios.post(`/api/login/${data.email}/${data.password}`)
      dispatch({ type: 'LOGIN', payload: response.data })
      redirect();
    } catch (error) {
      const errorMessage =
          error?.response?.data?.message ||
          defaultError;
        toast.error(errorMessage, messageSettings)
    }
  };
  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
        <meta
          name="description"
          content="Inicie sesión en nuestro sistema y tenga acceso a nuestros productos y servicios"
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
              Iniciar sesión
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <SwitchFormInputs
                HandleChange={handleChange}
                structureForm={Login}
              />
              <a
                href={`/forgot-password?afterUrl=${encodedAfterUrl}`}
                className="cursor-pointer text-lg font-medium text-gray-600 hover:text-indigo-500 transition-colors"
              >
                ¿Olvidó la contraseña?
              </a>
              <button className="w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-colors text-white py-2 text-lg font-medium">
                Iniciar sesión
              </button>
              <div className="text-base flex gap-5 items-center flex-nowrap mt-7">
                <p>¿No tiene una cuenta?</p>
                <a
                  href={`/register?afterUrl=${encodedAfterUrl}`}
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
