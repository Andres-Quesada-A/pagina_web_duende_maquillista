import { useState } from "react";
import InputCustom from "../form/InputCustom";
import {toast} from 'react-toastify'
import { messageSettings, defaultError } from '../../utils/messageSettings'
import axios from 'axios'

function AddCategory({ APIURL }) {
  const [data, setData] = useState({});

  const HandleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios.post(APIURL, data, { withCredentials: true })
      .then(() => {
        toast.success("Categoria agregada", messageSettings)
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          defaultError;
        toast.error(errorMessage, messageSettings)
      });
  };
  return (
    <form className="flex flex-col gap-4 " onSubmit={HandleSubmit}>
      <h4 className="text-xl font-medium">Agregar categoría</h4>
      <InputCustom
        HandleChange={HandleChange}
        id="description"
        label="Categoría"
        required={true}
        type="text"
        placeholder=""
      />
      <button className="flex justify-center items-center mx-auto text-white bg-indigo-500 hover:bg-indigo-400 transition-colors rounded-md w-full max-w-[280px] font-medium py-2">
        Agregar
      </button>
    </form>
  );
}

export default AddCategory;