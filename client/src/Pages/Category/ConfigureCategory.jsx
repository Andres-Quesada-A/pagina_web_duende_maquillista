import { useEffect, useState } from "react";
import EditCategory from "../../components/FormCategory/EditCategory";
import AddCategory from "../../components/FormCategory/addCategory";
import DeleteCategory from "../../components/FormCategory/deleteCategory";
import AddSubcategory from "../../components/FormSubcategory/AddSubcategory";
import DeleteSubcategory from "../../components/FormSubcategory/DeleteSubcategory";
import EditSubcategory from "../../components/FormSubcategory/EditSubcategory";

function ConfigureCategory() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    // Aqui se deben recuperar las categorias y subcategorias
  });
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
          SubCategories={subcategories}
        />
        <DeleteCategory Categories={categories} />
        <DeleteSubcategory
          Categories={categories}
          SubCategories={subcategories}
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
