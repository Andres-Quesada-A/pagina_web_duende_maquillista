import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { ImagesMockup } from "../../mockups/images";
import Product from "../../components/cards/product";
import SelectCustom from "../../components/form/SelectCustom";
import {
  CheckboxOptions,
  OptionsFilterPrice,
} from "../../Structures/shopFilters";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";
import ImageCard from "../../components/cards/ImageCard";

function Gallery() {
  const [search, setSearch] = useState({});
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    //codigo para solicitar los datos
    setData(ImagesMockup);
  }, []);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.id]: e.target.value });
  };

  const handleChangeFilters = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //buscar productos
  };
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
              options={OptionsFilterPrice}
              required={false}
            />
            <h4 className="mt-4 mb-3 font-semibold">Sub categorias</h4>
            <SwitchFormInputs
              HandleChange={handleChangeFilters}
              structureForm={CheckboxOptions}
            />
            <button className="mt-3 bg-indigo-500 hover:bg-indigo-400 transition-colors py-1 font-medium text-white w-full text-lg rounded-md">
              Buscar
            </button>
          </form>
        </div>
        <div className="w-full py-10 px-5 sm:px-10 md:px-20 ml-64">
          <header className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold text-indigo-500">
            Galería
            </h1>
          </header>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data && data.length === 0 ? (
              <h2>No hay productos</h2>
            ) : (
              data.map((item) => {
                return (
                  <ImageCard key={item.id} item={item}/>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
