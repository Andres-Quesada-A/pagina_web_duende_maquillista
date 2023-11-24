import { useState } from "react";
import { CloseIcon, NotificationIcon } from "./Icons";
import { toast } from "react-toastify";
import { messageSettings } from "../utils/messageSettings";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function Notifications() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState([]);
  const [data, setData] = useState([]);
  const { getUserEmail } = useAuthContext();

  const toggleNotification = async () => {
    try {
      if (!show) {
        const APIURL = `/api/get_notification_list/${getUserEmail()}`;
        const response = await axios.get(APIURL);
        setData(response.data);
      }
      setShow((prev) => !prev);
    } catch (error) {
      toast.error("No hay notificaciones", messageSettings);
    }
  };

  const handleDelete = async () => {
    try {
      const APIURL = `/api/delete_notification/${showDetails.id}`;
      await axios.delete(APIURL);
      const newArray = data.filter((item) => item.id != showDetails.id);
      setData(newArray);
      setShowDetails([]);
      toast.success("Notificación eliminada", messageSettings);
    } catch (error) {
      toast.error("No se puede eliminar", messageSettings);
    }
  };

  const ClassNotification = {
    Information: "bg-blue-50 border-blue-400 hover:bg-blue-100",
    Success: "bg-green-50 border-green-400 hover:bg-green-100",
    Error: "bg-red-50 border-red-400 hover:bg-red-100",
  };
  const ClassNotificationDetails = {
    Information: "bg-blue-50",
    Success: "bg-green-50",
    Error: "bg-red-50",
  };

  return (
    <>
      <div onClick={toggleNotification} className="cursor-pointer">
        <NotificationIcon className="w-8 h-8 text-indigo-400 hover:text-indigo-500 transition-colors" />
      </div>
      {show && (
        <div
          className={`p-6 px-2 rounded-xl shadow-[0_0px_60px_0px_rgba(0,0,0,0.3)] w-96 h-96 fixed top-20 right-3 bg-white`}
        >
          <CloseIcon
            onClick={toggleNotification}
            className="w-6 h-6 text-gray-600 absolute top-3 right-3 cursor-pointer"
          />
          <header className="flex justify-between">
            <h4 className="text-xl text-gray-600 font-medium px-2">
              Notificaciones
            </h4>
          </header>
          <ul className="border-2 border-gray-100 w-full h-72 mt-3 overflow-y-auto">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setShowDetails(item)}
                  className={`p-2 ${
                    ClassNotification[item.category.description]
                  } cursor-pointer border-l-4 `}
                >
                  <p className="text-sm">{item.title}</p>
                  <p className="line-clamp-1 text-xs">{item.description}</p>
                </li>
              );
            })}
          </ul>
          <div
            className={`absolute w-[367px] h-72 p-5 bg-gray-100 bottom-8 left-2 ${
              showDetails.length == 0
                ? "scale-0"
                : `scale-100 ${
                    ClassNotificationDetails[showDetails.category.description]
                  }`
            } transition-transform`}
          >
            <h4 className="font-medium text-lg mb-2">{showDetails?.title}</h4>
            <p className=" mb-2">{showDetails?.description}</p>
            {showDetails?.moreDetailsUrl && (
              <a
                className="font-medium text-indigo-700 underline"
                href={showDetails?.moreDetailsUrl}
                target="_blank"
              >
                Ver más detalles
              </a>
            )}
            <p className=" mb-2">
              Fecha: {showDetails?.timestamp?.slice(0, 10)}
            </p>
            <div className="flex gap-3 flex-row mt-6">
              <button
                className="border-2 border-gray-600 hover:text-white py-1 px-5 rounded-md bg-transparent hover:bg-gray-600 transition-colors"
                onClick={() => setShowDetails([])}
              >
                Cerrar
              </button>
              <button
                className="text-white py-1 px-5 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notifications;
