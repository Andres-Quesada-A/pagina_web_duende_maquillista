import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { productos } from "../../mockups/products";
import SelectCustom from "../../components/form/SelectCustom";
import { AmountOptions } from "../../Structures/shopFilters";

function ProductShop() {
  const { idProduct } = useParams();
  const [product, setProduct] = useState({});

  const HandleChange = (e) => {
    //vacio por el momento
  };

  useEffect(() => {
    //codigo no relevante
    const productoEncontrado = productos.find(
      (producto) => producto.id === parseInt(idProduct)
    );
    if (productoEncontrado) setProduct(productoEncontrado);
  }, [idProduct]);

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
      <section className="min-h-screen flex mt-16 py-20 px-5">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl mx-auto">
            <picture>
              <img
                src={product.urlImage}
                className="rounded-md aspect-ratio-1/1 object-cover w-full max-w-md max-h-[500px]"
              />
            </picture>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-medium text-gray-600">
                {product.title}
              </h1>
              <p>{product.state}</p>
              <p>{product.description}</p>
              <p className="text-4xl text-gray-600 font-semibold flex justify-start gap-1">
                <span className="text-base">$</span>
                {product.price}
              </p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 items-end mt-5">
                  <SelectCustom
                    label="Cantidad de productos"
                    id="amount"
                    HandleChange={HandleChange}
                    required={true}
                    options={AmountOptions}
                  />
                <button className="h-11 w-full sm:w-auto rounded-lg px-5 text-white font-medium text-lg bg-indigo-500 hover:bg-indigo-400 transition-colors">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductShop;
