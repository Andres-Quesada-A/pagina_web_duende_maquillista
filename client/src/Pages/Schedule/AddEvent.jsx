import { useState } from "react";
import { messageSettings, defaultError } from "../../utils/messageSettings";
import { toast } from "react-toastify";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";
import { EventStructure } from "../../Structures/EventStructure";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const [data, setData] = useState({
    title: "",
    category: EventStructure[1].options[0].value,
    startTime: "",
    endTime: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const APIURL = "/api/create_event";

    try {
      await axios.post(APIURL, {
        ...data,
        startTime: (new Date(data.startTime)).toISOString(),
        endTime: (new Date(data.endTime)).toISOString()
        }, { withCredentials: true });
      toast.success("Evento creado exitosamente.", messageSettings);
      navigate("/schedule");
    } catch (error) {
      console.log(error)
      const errorMessage =
          error?.response?.data?.message ||
          defaultError;
      toast.error(errorMessage, messageSettings);
    }
  };
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14 px-5">
      <header className="w-full max-w-4xl">
        <h1 className="font-semibold text-4xl text-indigo-500">
          Añadir evento
        </h1>
      </header>
      <form
        className="w-full max-w-xl grid grid-cols-1 gap-2 mt-10 pb-10"
        onSubmit={handleSubmit}
      >
        <h4 className="text-xl font-medium text-gray-700 w-full">
          Datos del evento
        </h4>
        <SwitchFormInputs
        HandleChange={handleChange}
        structureForm={EventStructure}
        data={data}
        />
        <div className="grid grid-cols-2 gap-4 mt-5">
        <button
            className="text-lg w-full py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
            type="submit"
        >
            Confirmar
        </button>
        <button
            className="text-lg w-full py-2 rounded-md text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 transition-colors"
            onClick={() => history.back()}
            type="button"
        >
            Cancelar
        </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
