import { useEffect, useState } from "react";
import EditCategory from "../../components/FormCategory/EditCategory";
import AddCategory from "../../components/FormCategory/AddCategory";
import DeleteCategory from "../../components/FormCategory/DeleteCategory";
import { toast } from "react-toastify";
import { messageSettings } from "../../utils/messageSettings";
import axios from "axios";

function ConfigureCategoryProduct() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/get_product_category_list', { withCredentials: true })
        const TempCategories = response.data
        const Formated = TempCategories.map(item => ({
          value: item.description,
          label: item.description
        }))
        setCategories([{label: "Seleccione", value:""}, ...Formated])
      } catch (error) {
        toast.info('No hay categorías.', messageSettings)
      }
    }
    getData()
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14 px-5">
      <header className="w-full max-w-4xl">
        <h1 className="font-semibold text-4xl text-indigo-500">
          Configurar categorías (tienda)
        </h1>
      </header>
      <section className="grid grid-cols-1 gap-10 w-1/4 max-w-4xl mt-10 ">
        <AddCategory APIURL={"/api/create_product_category"}/>
        <EditCategory Categories={categories} APIURL={"/api/edit_product_category"}/>
        <DeleteCategory Categories={categories} APIURL={"/api/delete_product_category"}/>
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
