import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { messageSettings } from '../../utils/messageSettings';
import Confirmation from '../Modals/Confirmation';

function DeleteCategory({Categories, APIURL}) {
  const [data, setData] = useState({});
  const HandleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const HandleDelete = async() => {
    console.log("handledelete")
    // try {
    //   axios.delete(`${APIURL}/data.category`)
    // } catch (error) {
    //   toast.error("No se puede eliminar la categoria", messageSettings)
    // }
  }

  console.log(data)
  return (
    <form className="flex flex-col gap-4">
      <h4 className="text-xl font-medium">Eliminar Categoria</h4>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Categoria
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
                {item.label}
              </option>
            ))}
        </select>
      </div>
      <Confirmation title={"Confirmación"} description={"¿Está seguro de proceder con la eliminación? Esta acción no se puede deshacer."} handleDelete={HandleDelete}/>
      <button >
        Eliminar
      </button>
    </form>
  );
}

export default DeleteCategory
