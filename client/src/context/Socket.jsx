import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { messageSettings } from "../utils/messageSettings";

// {"id":1,"title":"Prueba","description":"Esta es la notificación de prueba","timestamp":"2023-11-21T23:35:05.267Z","category":{"description":"Information"}}
const SocketClient = () => {
  const { GetUserID } = useAuthContext();

  useEffect(() => {
    const socketUrl = window.location.href.startsWith("http://localhost:")
      ? "ws://localhost:1234"
      : "wss://duendemaquillista.azurewebsites.net";
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      console.log("connected");
      const messageToSend = JSON.stringify({ userId: GetUserID() });
      ws.send(messageToSend);
    };
    ws.onmessage = (e) => {
      console.log(e.data);
      const message = JSON.parse(e.data);
      
      const category = message.category.description;

      const output = (
        <div>
          <p className="text-lg font-bold">{message.title}</p>
          <p>{message.description}</p>
          {message.moreDetailsUrl && (
            <a className="font-medium text-indigo-700 underline" href={message.moreDetailsUrl} target="_blank" rel="noreferrer">
              Ver más detalles
            </a>
          )}
        </div>
      );

      if (category == "Success") {
        toast.success(output, { ...messageSettings, autoClose: false });
      } else if (category == "Information") {
        toast.info(output, { ...messageSettings, autoClose: false });
      } else {
        toast.error(output, { ...messageSettings, autoClose: false });
      }
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  return <></>;
};

export default SocketClient;
