import { useEffect, useState } from "react";
import EditCategory from "../../components/FormCategory/EditCategory";
import AddCategory from "../../components/FormCategory/addCategory";
import DeleteCategory from "../../components/FormCategory/deleteCategory";
import { toast } from "react-toastify";
import { messageSettings } from "../../utils/messageSettings";
import axios from "axios";

function ConfigureCategoryProduct() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      console.log("here")
      try {
        const response = await axios.get('http://localhost:1234/api/get_product_category_list')
        const TempCategories = response.data
        const Formated = TempCategories.map(item => ({
          value: item.description,
          label: item.description
        }))
        setCategories([{label: "Seleccione", value:""}, ...Formated])
      } catch (error) {
        toast.info('No hay categorias', messageSettings)
      }
    }
    getData()
  }, []);
  console.log(categories)
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14 px-5">
      <header className="w-full max-w-4xl">
        <h1 className="font-medium text-3xl text-indigo-500">
          Configurar categoría de producto
        </h1>
        <hr className="border-indigo-500 border-1 mt-2"></hr>
      </header>
      <section className="grid grid-cols-2 gap-10 w-full max-w-4xl mt-10 ">
        <AddCategory APIURL={"http://localhost:1234/api/create_product_category"}/>
        <EditCategory Categories={categories} APIURL={""}/>
        <DeleteCategory Categories={categories} APIURL={""}/>
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

export default ConfigureCategoryProduct;
