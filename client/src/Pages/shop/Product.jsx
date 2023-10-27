import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { messageSettings } from "../../utils/messageSettings";
import SelectCustom from "../../components/form/SelectCustom";
import { AmountOptions } from "../../Structures/shopFilters";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from '../../utils/formatCurrency';

function ProductShop() {
  const { idProduct } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { getItemQuantity, AddProductCar, removeFromCart } = useShoppingCart();

  const HandleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const addProductToCart = () => {
    AddProductCar({ ...product, amount: quantity });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:1234/api/get_product/` + parseInt(idProduct), { withCredentials: true })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Ocurrió un error al cargar el detalle del producto";
        toast.error(errorMessage, messageSettings);
      });
  }, [idProduct]);

  const amount = getItemQuantity(idProduct);
  return (
    <>
      <Helmet>
        <title>Tienda de Duende</title>
        <meta
          name="description"
          content="Visite nuestra tienda y descubra todos nuestros productos disponibles"
        />
        <link rel="canonical" href="/shop" />
      </Helmet>
      <section className="min-h-screen flex mt-16 py-20 px-5">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl mx-auto">
            <picture>
              <img
                src={product.imageUrl}
                className="rounded-md aspect-ratio-1/1 object-cover w-full max-w-md max-h-[500px]"
              />
            </picture>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-medium text-gray-600">
                {product.name}
              </h1>
              <p>
                <span className="font-bold">Estado:</span>{" "}
                {product.available ? "Disponible" : "No disponible"}
              </p>
              <p>{product.description}</p>
              <p className="text-4xl text-gray-600 font-semibold flex justify-start gap-1">
                <span className="text-xl">₡</span>
                {formatCurrency(product.price).replace("₡", "")}
              </p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 items-end mt-5">
                <SelectCustom
                  label="Cantidad de productos"
                  id="amount"
                  HandleChange={HandleChange}
                  required={true}
                  options={AmountOptions}
                  value={{ amount: amount }}
                />
                <button
                  onClick={addProductToCart}
                  className="h-11 w-full sm:w-auto rounded-lg px-5 text-white font-medium text-base bg-indigo-500 hover:bg-indigo-400 transition-colors"
                >
                  Agregar al carrito
                </button>
                {amount != 0 && (
                  <button
                    onClick={() => removeFromCart(idProduct)}
                    className="h-11 w-full sm:w-auto rounded-lg px-5 text-white font-medium text-base bg-red-500 hover:bg-red-400 transition-colors"
                  >
                    Quitar del carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductShop;
