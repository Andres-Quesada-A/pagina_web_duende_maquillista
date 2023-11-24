import React, { useState } from 'react'
import InputCustom from '../form/InputCustom';
import { messageSettings, defaultError } from '../../utils/messageSettings';
import { toast } from 'react-toastify';
import axios from 'axios';

function EditCategory({ Categories, APIURL}) {
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  
  const HandleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  
  const HandleCategoryChange = (e) =>{
    setCategory({ ...category, [e.target.id]: e.target.value });
  };
  
  const HandleSubmit = (e) => {
    e.preventDefault();
    const fullData = {...data, ...category}
    axios.put(APIURL, fullData, { withCredentials: true })
      .then(() => {
        toast.success("Categoría actualizada.", messageSettings)
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          defaultError;
        toast.error(errorMessage, messageSettings)
      });
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={HandleSubmit}>
      <h4 className="text-xl font-medium">Modificar categoría</h4>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Categoría
        </label>
        <select
          id="description"
          onChange={HandleCategoryChange}
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
      <InputCustom
        HandleChange={HandleChange}
        id="newDescription"
        label="Nuevo valor"
        required={true}
        type="text"
        placeholder=""
      />
      <button className="flex justify-center items-center mx-auto text-white bg-indigo-500 hover:bg-indigo-400 transition-colors rounded-md w-full max-w-[280px] font-medium py-2">
        Modificar
      </button>
    </form>
  );
}

export default EditCategory
