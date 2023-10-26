import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import SelectCustom from "../../components/form/SelectCustom";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";
import ImageCard from "../../components/cards/ImageCard";
import ImageCardDuende from "../../components/cards/ImageCardDuende";
import axios from 'axios';
import { toast } from 'react-toastify'
import { messageSettings } from '../../utils/messageSettings'
import { getKeysCheckbox } from "../../utils/getkeysCheckbox";


function Gallery() {
  const [search, setSearch] = useState({});
  const [filters, setFilters] = useState({});
  const [Subcategoryfilters, setSubcategoryfilters] = useState({});
  const [data, setData] = useState([]);
  const [imageFiltered, setImageFiltered] = useState([]);
  const [category, setCategory] = useState([]);
  const [admin, setAdmin] = useState(true)

  function getSubcategories() {
    const selectedCategoryObject = category.find(item => item.category === filters.category);
    if (selectedCategoryObject && selectedCategoryObject.subcategory) {
      const subcategories = selectedCategoryObject.subcategory.map(item => ({
        label: item,
        type: "checkbox",
        value: item,
      }));
      return subcategories
    } else {
      return [];
    }
  }

  function deleteImage(id) {
    //logic for deleting images. requires ImageCardDuende
    //its use is only in ImageCardDuende
    //
    console.log(id);
  }

  useEffect(() => {
    const apiImageURL = 'http://localhost:1234/api/get_image_list'
    const apiCategoryURL = 'http://localhost:1234/api/get_category'
    //setAdmin(false)

    axios.get(apiImageURL, { withCredentials: true }).then((response) => {
      const dataImage = response.data
      setImageFiltered(dataImage)
      console.log(response)
      setData(dataImage);
    }).catch((error) => {
      toast.error("Ocurrió un error al cargar las imágenes", messageSettings);
    })

    axios.get(apiCategoryURL, { withCredentials: true }).then((response) => {
      const dataCategories = response.data
      console.log(response)
      setCategory(dataCategories);
    }).catch((error) => {
      toast.error("Ocurrió un error al cargar las categorías", messageSettings);
    })
  }, []);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.id]: e.target.value });
  };

  const handleChangeFilters = (e) => {

    setFilters({ ...filters, [e.target.id]: e.target.value });
    setSubcategoryfilters({});
  };

  const handleChangeSubcategoryFilters = (e) => {

    setSubcategoryfilters({ ...Subcategoryfilters, [e.target.id]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keys = getKeysCheckbox(Subcategoryfilters)
    //setImageFiltered( (data.filter(key => key.category === filters.category)).filter(key => keys.) )
    const filteredImages = data.filter(image => image.category === filters.category &&
      (keys.length === 0 || keys.some(subcategory => image.subcategory.includes(subcategory))));
    setImageFiltered(filteredImages);
  };
  const categoryOptions = category.map(item => ({
    value: item.category,
    label: item.category
  }));
  const subcategoryOptions = getSubcategories();
  console.log(filters)
  console.log(Subcategoryfilters)
  return (
    <>
      <Helmet>
        <title>Galeria del duende</title>
        <meta
          name="description"
          content="Visita nuestra tienda y descubre todos nuestros productos disponibles"
        />
        <link rel="canonical" href="/shop" />
      </Helmet>
      <section className="min-h-screen flex mt-16">
        <div className="bg-indigo-50 h-screen w-64 fixed top-0 pt-24 px-5">
          <h4 className="text-gray-600 font-semibold text-2xl mb-5">Filtros</h4>
          <form onSubmit={handleSubmit}>
            <SelectCustom
              HandleChange={handleChangeFilters}
              id="category"
              label="Seleccione una categoría"
              options={[{ value: "", label: "seleccione" }, ...categoryOptions]}
              required={false}
            />
            <h4 className="mt-4 mb-3 font-semibold">Sub categorias</h4>
            <SwitchFormInputs
              HandleChange={handleChangeSubcategoryFilters}
              data={Subcategoryfilters}
              structureForm={subcategoryOptions}
            />
            <button className="mt-3 bg-indigo-500 hover:bg-indigo-400 transition-colors py-1 font-medium text-white w-full text-lg rounded-md">
              Buscar
            </button>
          </form>
        </div>
        <div className="w-full ml-64">
          <div className="w-full h-16 flex items-center justify-end gap-4 pr-10 bg-indigo-200">
            <a href = "/gallery/add_image">
              <div className="w-60 text-center px-5 py-2 text-white font-medium rounded-lg bg-indigo-400">
                Subir Imagen
              </div>
            </a>

            <a href = "/configure_category">
              <div className="w-60 text-center px-5 py-2 text-white font-medium rounded-lg bg-indigo-400">
                Configurar Categorias
              </div>
            </a>

          </div>
          <div className="w-full py-10 px-5 sm:px-10 md:px-20">

            <header className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold text-indigo-500">
                Galería
              </h1>
            </header>
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {imageFiltered && imageFiltered.length === 0 &&
                <h2>No hay productos</h2>
              }
              {admin === false ? (
                imageFiltered.map((item) => (
                  <ImageCard key={item.id} item={item} />
                )
                )
              ) : (imageFiltered.map((item) => (
                <ImageCardDuende key={item.id} item={item} deleteImage={deleteImage} />
              )
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default Gallery;
