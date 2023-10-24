import { useState } from 'react'
import InputCustom from '../form/InputCustom';

function EditSubcategory({ Categories, SubCategories }) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [Subcategory, setSubcategory] = useState({});
  
  //function getSubcategories() {
  //  const selectedCategoryObject = category.find(item => item.category === filters.category);
  //  if (selectedCategoryObject && selectedCategoryObject.subcategory) {
  //    const subcategories = selectedCategoryObject.subcategory.map(item => ({
  //      label: item,
  //      type: "checkbox",
  //      value: item,
  //    }));
  //    return subcategories
  //  } else {
  //    return [];
  //  }
  //}


  const HandleChange = (e) => {
    setSelectedCategory({ ...selectedCategory, [e.target.id]: e.target.value });
  };
  const HandleCategoryChange = (e) => {
    setSelectedCategory({ ...selectedCategory, [e.target.id]: e.target.value });
    
    
    setSubcategory() //analisis
    setSelectedSubcategory({})
  };
  const HandleSubcategoryChange = (e) => {
    setSelectedSubcategory({ ...selectedSubcategory, [e.target.id]: e.target.value });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={HandleSubmit}>
      <h4 className="text-xl font-medium">Modificar Subcategoria</h4>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Categoria
        </label>
        <select
          id="category"
          onChange={HandleCategoryChange}
          required={true}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
        >
          {Categories &&
            Categories.map((item, index) => (
              <option key={index} value={item.description}>
                {item.description}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-base font-medium text-gray-900 ">
          Subcategoria
        </label>
        <select
          id="subcategory"
          onChange={HandleSubcategoryChange}
          required={true}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
        >
          {SubCategories &&
            SubCategories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.description}
              </option>
            ))}
        </select>
      </div>
      <InputCustom
        HandleChange={HandleChange}
        id="description"
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

export default EditSubcategory
