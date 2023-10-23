import { Helmet } from "react-helmet-async";
import { Search } from "../../components/Icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { messageSettings } from "../../utils/messageSettings";
import Product from "../../components/cards/product";
import SelectCustom from "../../components/form/SelectCustom";
import { OptionsFilterPrice } from "../../Structures/shopFilters";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";

function Shop() {
  const [search, setSearch] = useState({});
  const [sorting, setSorting] = useState({});
  const [products, setProducts] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Request to get products
    axios
      .get(`http://localhost:1234/api/get_product_list`)
      .then((res) => {
        setProducts(JSON.stringify(res.data));
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.[0]?.message ||
          "Algo salió mal al cargar los productos";
        toast.error(errorMessage, messageSettings);
      });

    // Request to get the categories
    axios
      .get(`http://localhost:1234/api/get_product_category_list`)
      .then((res) => {
        let newCategories = {};
        res.data.forEach((category) => {
          newCategories[category.description] = false;
        });
        setCategories(newCategories);
        console.log(newCategories);
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.[0]?.message ||
          "Algo salió mal al cargar las categorías";
        toast.error(errorMessage, messageSettings);
      });
  }, []);

  const handleChangeSearch = (e) => {
    setSearch({ ...search, [e.target.id]: e.target.value });
  };

  const handleChangeCategories = (e) => {
    setCategories({ ...categories, [e.target.id]: e.target.checked });
  };

  const handleChangeSorting = (e) => {
    setSorting({ ...sorting, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterProducts();
  };

  useEffect(() => {
    filterProducts();
  }, [products]);

  const filterProducts = () => {
    if (!products) return;
    let filtered = JSON.parse(products); // Para cargarlos en el orden original
    if (search.search) {
      const searchTerm = search.search
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(searchTerm)
      );
    }
    if (sorting["order-price"] && sorting["order-price"] !== "") {
      if (sorting["order-price"] === "lower-to-higher") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sorting["order-price"] === "higher-to-lower") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
    }
    let categoriesFiltered = [];
    Object.keys(categories).forEach((category) => {
      if (categories[category]) {
        categoriesFiltered.push(category);
      }
    });
    if (categoriesFiltered.length > 0) {
      filtered = filtered.filter((product) =>
        categoriesFiltered.includes(product.category.description)
      );
    }
    setFilteredProducts(filtered);
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
              HandleChange={handleChangeSorting}
              id="order-price"
              label="Ordenar por"
              options={OptionsFilterPrice}
              required={false}
            />
            <h4 className="mt-4 mb-3 font-semibold">Categorías</h4>
            <SwitchFormInputs
              HandleChange={handleChangeCategories}
              structureForm={Object.keys(categories).map((category) => ({
                label: category,
                type: "checkbox",
                value: category,
                checked: categories[category],
              }))}
            />
            <h4 className="mt-4 mb-3 font-semibold">Productos</h4>
            <input
              onChange={handleChangeSearch}
              type="text"
              placeholder="Buscar"
              id="search"
              className="h-10 bg-gray-50 border border-indigo-300 text-gray-900 text-base rounded-xl focus:outline-none focus:ring-4 focus:border-indigo-400 focus:ring-indigo-100 block w-full px-2.5"
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
          </header>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredProducts && filteredProducts.length === 0 ? (
              <h2>No hay productos</h2>
            ) : (
              filteredProducts.map(
                ({ id, description, name, available, price, imageUrl }) => {
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
                }
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
