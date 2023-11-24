import { useEffect, useState } from "react";
import { messageSettings, defaultError } from "../../utils/messageSettings";
import { toast } from "react-toastify";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";
import { EventStructure } from "../../Structures/EventStructure";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { localHtmlAttribute } from "../../utils/dateFormatter";

function EditEvent() {
  const { idEvent } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve event information
    axios.get(`/api/get_event/${idEvent}`, { withCredentials: true }).then((res) => {
      const eventData = res.data;
      eventData.startTime = localHtmlAttribute(eventData.startTime);
      eventData.endTime = localHtmlAttribute(eventData.endTime);
      setData(eventData);
    }).catch((error) => {
      const errorMessage =
          error?.response?.data?.message ||
          defaultError;
      toast.error(errorMessage, messageSettings);
      navigate("/schedule");
    });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const APIURL = "/api/edit_event";

    try {
      await axios.put(APIURL, {
        ...data,
        startTime: (new Date(data.startTime)).toISOString(),
        endTime: (new Date(data.endTime)).toISOString()
        }, { withCredentials: true });
      toast.success("Evento modificado exitosamente.", messageSettings);
      navigate("/schedule");
    } catch (error) {
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
          Editar evento
        </h1>
      </header>
      <form
        className="w-full max-w-4xl grid grid-cols-2 gap-10 mt-10 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-2">
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
        </div>
        <div className="flex flex-col gap-5 items-center">
          <label className="text-xl font-medium text-gray-700 w-full">
            Información adicional
          </label>
          {
            data.orderId
            ?
            <Link
              className="rounded-lg w-64 object-cover aspect-square bg-slate-100 hover:bg-slate-200 text-lg shadow-md flex flex-col justify-center items-center"
              to={`/order/${data.orderId}`}>
                Ver orden asociada:<br />
                <span className="font-bold">Orden #{data.orderId}</span>
            </Link>
            :
            <p className="text-slate-400 text-lg">No hay más información</p>
          }
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
