import { useEffect, useState } from "react";
import EditCategory from "../../components/FormCategory/EditCategory";
import AddCategory from "../../components/FormCategory/AddCategory";
import DeleteCategory from "../../components/FormCategory/DeleteCategory";
import AddSubcategory from "../../components/FormSubcategory/AddSubcategory";
import DeleteSubcategory from "../../components/FormSubcategory/DeleteSubcategory";
import EditSubcategory from "../../components/FormSubcategory/EditSubcategory";
import {toast} from 'react-toastify';
import {messageSettings} from '../../utils/messageSettings';
import axios from 'axios';

function ConfigureCategory() {
  const [raw, setRaw] = useState([]);
  const [formatData, setFormatData] = useState([]);
  const [categories, setCategories] = useState([]);
  const apiCategoryURL = {
    get:'http://localhost:1234/api/get_category',
    post:'http://localhost:1234/api/create_category',// :category
    put:'http://localhost:1234/api/edit_category',// :category/:new_category
    delete:'http://localhost:1234/api/delete_category'// :category
  }
  const apiSubcategoryURL = {
    post: 'http://localhost:1234/api/create_subcategory', // :category/:subcategory
    put: 'http://localhost:1234/api/edit_subcategory', //:category/:subcategory/:new_subcategory
    delete: 'http://localhost:1234/api/delete_subcategory'// :category/:subcategory
  }
  const preSelectionValue = { value: "seleccione", subcategory: null }

  useEffect(() => {
    // Aqui se deben recuperar las categorias y subcategorias

    axios.get(apiCategoryURL.get, { withCredentials: true }).then((response) => {
      const rawdata = response.data
      setRaw(rawdata)

      setFormatData([ preSelectionValue ,...rawdata.map(item => ({"value": item.category, "subcategory": item.subcategory}))]);
      setCategories([ preSelectionValue ,...rawdata.map(item => ({"value": item.category}))])
    }).catch((error) => {
      toast.error("Ocurrió un error al cargar las categorías", messageSettings);
    })

  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14 px-5">
      <header className="w-full max-w-4xl">
        <h1 className="font-medium text-3xl text-indigo-500">
          Configurar categoría
        </h1>
        <hr className="border-indigo-500 border-1 mt-2"></hr>
      </header>
      <section className="grid grid-cols-2 gap-10 w-full max-w-4xl mt-10 ">
        <AddCategory APIURL={apiCategoryURL.post}/>
        <AddSubcategory Categories={categories} APIURL={apiSubcategoryURL.post} />

        <EditCategory Categories={categories} APIURL={apiCategoryURL.put} />
        <EditSubcategory Raw={formatData} APIURL={apiSubcategoryURL.put} />

        <DeleteCategory Categories={categories} APIURL={apiCategoryURL.delete} />
        <DeleteSubcategory Raw={formatData} APIURL={apiSubcategoryURL.delete} />
      </section>
      <button
        className=" flex justify-center items-center mx-auto text-lg w-full max-w-[280px] mt-10 py-2 rounded-md text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 transition-colors"
        onClick={() => history.back()}
      >
        Cancelar
      </button>
    </div>
  );
}

export default ConfigureCategory;
