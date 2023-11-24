import { useState } from "react";
import InputCustom from "../form/InputCustom";
import {toast} from 'react-toastify'
import { messageSettings, defaultError } from '../../utils/messageSettings'
import axios from 'axios'

function EditSubcategory({ Raw, APIURL }) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [selectedNewSubcategory, setSelectedNewSubcategory] = useState({});
  const [subcategories, setSubcategories] = useState({});
  const aux = [{subcategory: ""}]

  function getSubcategories(x) {
    const selectedObject = Raw.find(item => item.value === x.category);

    //console.log("object",selectedObject);
    if (selectedObject && selectedObject.subcategory) {
      const subcategories = selectedObject.subcategory.map(item => ({
        subcategory: item,
      }));
      return [{"subcategory": "Seleccione"}, ...subcategories ]
    } else {
      return {};
    }
  }

  const HandleNewSubcategoryChange = (e) => {
    setSelectedNewSubcategory({ ...selectedNewSubcategory, [e.target.id]: e.target.value });
  };

  const HandleCategoryChange = (e) => {
    var x = {[e.target.id]: e.target.value}
    setSelectedCategory({ ...selectedNewSubcategory, [e.target.id]: e.target.value });
    setSubcategories(getSubcategories(x))
    setSelectedSubcategory({ });
  };

  const HandleSubcategoryChange = (e) => {
    setSelectedSubcategory({ ...selectedSubcategory, [e.target.id]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSubcategory.subcategory || selectedSubcategory.subcategory === "Seleccione") {
      toast.error("Seleccione una subcategoría.", messageSettings)
      return
    }
    if (!selectedCategory.category || selectedCategory.category === "Seleccione") {
      toast.error("Seleccione una categoría.", messageSettings)
      return
    }
    if (!selectedNewSubcategory.newSubcategory || selectedNewSubcategory.newSubcategory === "Seleccione") {
      toast.error("\"Seleccione\" no es opción válida .", messageSettings)
      return
    }

    const fullData = {...selectedNewSubcategory, ...selectedSubcategory, ...selectedCategory}
    
    axios.put(APIURL, fullData)
      .then(() => {
        toast.success("Subcategoría modificada.", messageSettings)
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
      <h4 className="text-xl font-medium">Modificar subcategoría</h4>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Categoría
        </label>
        <select
          id="category"
          onChange={HandleCategoryChange}
          required={true}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
        >
          {Raw &&
            Raw.map((item, index) => (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            ))}
        </select>
      </div>
      {subcategories && subcategories.length > 0 ? (
  <div>
    <label className="block mb-2 text-base font-medium text-gray-900">
      Subcategoría
    </label>
    <select
      id="subcategory"
      onChange={HandleSubcategoryChange}
      required={true}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5"
    >
      {subcategories &&
        subcategories.map((item, index) => (
          <option key={index} value={item.subcategory} selected={item.subcategory === selectedSubcategory.subcategory} >
            {item.subcategory}
          </option>
        ))}
    </select>
  </div>
) : (
  // Render something else if subcategories is empy or null
  <div>
    <label className="block mb-2 text-base font-medium text-gray-900">
      Subcategoría
    </label>
    <select
      id="subcategory"
      onChange={HandleSubcategoryChange}
      required={true}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5"
    >
      {aux &&
        aux.map((item, index) => (
          <option key={index} value={item.subcategory}>
            {item.subcategory}
          </option>
        ))}
    </select>
  </div>
)}
      <InputCustom
        HandleChange={HandleNewSubcategoryChange}
        id="newSubcategory"
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

export default EditSubcategory
