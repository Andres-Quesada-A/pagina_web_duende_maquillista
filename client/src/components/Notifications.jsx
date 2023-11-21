import { useState } from "react";
import { CloseIcon, NotificationIcon } from "./Icons";
import { toast } from "react-toastify";
import { messageSettings } from "../utils/messageSettings";
// import axios from "axios";
import { notificationsMockup } from "../mockups/NotificationsMockup";

function Notifications() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const toggleNotification = async () => {
    try {
      if (!show) {
        //  const response = await axios.get("/api/")
        setData(notificationsMockup);
      }
      setShow((prev) => !prev);
    } catch (error) {
      toast.error("No hay notificaciones", messageSettings);
    }
  };

  return (
    <>
      <div onClick={toggleNotification} className="cursor-pointer">
        <NotificationIcon className="w-8 h-8 text-indigo-400 hover:text-indigo-500 transition-colors" />
      </div>
      {show && (
        <div
          className={`p-6 px-4 rounded-xl shadow-[0_0px_60px_0px_rgba(0,0,0,0.3)] w-96 h-96 fixed top-20 right-3 bg-white`}
        >
          <CloseIcon
            onClick={toggleNotification}
            className="w-6 h-6 text-gray-600 absolute top-3 right-3 cursor-pointer"
          />
          <header className="flex justify-between">
            <h4 className="text-xl text-gray-600 font-medium">
              Notificaciones
            </h4>
          </header>
          <ul className="bg-gray-100 w-full h-72 mt-3 overflow-y-auto">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className="p-2 border-b-2 bg-transparent hover:bg-gray-200 cursor-pointer"
                >
                  <p className="text-sm">{item.title}</p>
                  <p className="line-clamp-1 text-xs">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Notifications;
