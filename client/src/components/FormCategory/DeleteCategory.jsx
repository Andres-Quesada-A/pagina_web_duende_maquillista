import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { messageSettings, defaultError } from "../../utils/messageSettings";
import ConfirmationButton from "../Modals/ConfirmationButton";

function DeleteCategory({ Categories, APIURL }) {
  const [data, setData] = useState({});
  const HandleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const HandleDelete = () => {
    axios.delete(`${APIURL}/${data.category}`, { withCredentials: true })
      .then(() => {
        toast.success("Categoría eliminada.", messageSettings)
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          defaultError;
        toast.error(errorMessage, messageSettings)
      });
  };

  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-xl font-medium">Eliminar categoría</h4>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Categoría
        </label>
        <select
          id="category"
          onChange={HandleChange}
          required={true}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
        >
          {Categories &&
            Categories.map((item, index) => (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            ))}
        </select>
      </div>
      <ConfirmationButton
        title={"Confirmación"}
        description={
          "¿Está seguro de proceder con la eliminación? Esta acción no se puede deshacer."
        }
        handleDelete={HandleDelete}
      />
    </section>
  );
}

export default DeleteCategory;
