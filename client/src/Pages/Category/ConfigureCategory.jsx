import { useEffect, useState } from "react";
import EditCategory from "../../components/FormCategory/EditCategory";
import AddCategory from "../../components/FormCategory/addCategory";
import DeleteCategory from "../../components/FormCategory/deleteCategory";
import AddSubcategory from "../../components/FormSubcategory/AddSubcategory";
import DeleteSubcategory from "../../components/FormSubcategory/DeleteSubcategory";
import EditSubcategory from "../../components/FormSubcategory/EditSubcategory";
import axios from 'axios';

function ConfigureCategory() {
  const [data, setData] = useState([]);
  const [categoryFilter, setcategoryFilter] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  

  useEffect(() => {
    // Aqui se deben recuperar las categorias y subcategorias

    const apiCategoryURL = 'http://localhost:1234/api/get_category'
    
    axios.get(apiCategoryURL).then((response) => {
      const dataCategories = response.data
      console.log(response)
      setData(dataCategories);
      setCategories(dataCategories.map(item => ({"description": item.category})))
    }).catch((error) => {
      toast.error("No se logro recuperar las categorias", messageSettings);
    })


  }, []);

  const handleCategoryFilter = (e) => {

    setFilters({ ...filters, [e.target.id]: e.target.value });
    
    setSubcategory();
  };

  const handleChangeSubcategoryFilters = (e) => {

    setSubcategoryfilters({ ...Subcategoryfilters, [e.target.id]: e.target.checked });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14">
      <header className="w-full max-w-4xl">
        <h1 className="font-medium text-3xl text-indigo-500">
          Configurar categoría
        </h1>
        <hr className="border-indigo-500 border-1 mt-2"></hr>
      </header>
      <section className="grid grid-cols-2 gap-10 w-full max-w-4xl mt-10 ">
        <AddCategory />
        <AddSubcategory Categories={categories} />
        <EditCategory Categories={categories} />
        <EditSubcategory
          Categories={categories}
          SubCategories={data}
        />
        <DeleteCategory Categories={categories} />
        <DeleteSubcategory
          Categories={categories}
          SubCategories={data}
        />
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
