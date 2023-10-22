import { Helmet } from "react-helmet-async";
import { Search } from "../../components/Icons";
import { useEffect, useState } from "react";
import { productos } from "../../mockups/products";
import { toast } from "react-toastify";
import axios from "axios"
import { messageSettings } from "../../utils/messageSettings";
import Product from "../../components/cards/product";
import SelectCustom from "../../components/form/SelectCustom";
import {
  CheckboxOptions,
  OptionsFilterPrice,
} from "../../Structures/shopFilters";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";

function Shop() {
  const [search, setSearch] = useState({});
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    // Request to get products
    try {
      axios.get(`http://localhost:1234/api/get_product_list`).then((res) => {
        setData(res.data)
     })
    } catch (error) {
        toast.error("Algo salió sal", messageSettings)
    }
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
        <title>Tienda de Duende</title>
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
              id="order-price"
              label="Ordenar por"
              options={OptionsFilterPrice}
              required={false}
            />
            <h4 className="mt-4 mb-3 font-semibold">Productos</h4>
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
              Tienda de Duende
            </h1>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="text"
                placeholder="search"
                id="search"
                className="bg-gray-50 border border-indigo-300 text-gray-900 text-base rounded-xl focus:outline-none focus:ring-4 focus:border-indigo-400  focus:ring-indigo-100 block w-full px-2.5"
              />
              <button className="bg-indigo-500 hover:bg-indigo-400 transition-colors min-w-[40px] max-w-[40px] h-10 rounded-md flex justify-center items-center">
                <Search className="text-white" />
              </button>
            </div>
          </header>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data && data.length === 0 ? (
              <h2>No hay productos</h2>
            ) : (
              data.map(({ id, description, name, available, price, imageUrl }) => {
                return (
                  <Product
                    id={id}
                    description={description}
                    imageUrl={imageUrl}
                    price={price}
                    available={available}
                    name={name}
                    key={id}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
