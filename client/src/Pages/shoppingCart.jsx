import { useContext, useState } from "react";
import { location } from "../Structures/location";
import PlaceholderImage from "../images/placeholderImage.jpeg";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { messageSettings } from "../utils/messageSettings";

function ShoppingCart() {
  const { cartItems, removeFromCart, increaseProductCart } = useShoppingCart();
  const { GetUserID } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [exactLocation, setExactLocation] = useState({
    selectedProvince: "",
    selectedCanton: "",
    selectedDistrict: "",
  });

  const provinces = location.provinces;

  // Filtrar cantones y distritos basados en la selección
  const selectedProvinceData = provinces.find(
    (province) => province.name === exactLocation.selectedProvince
  );

  const cantons = selectedProvinceData
    ? selectedProvinceData.cantons.map((canton) => canton.name)
    : [];

  const districts = selectedProvinceData
    ? selectedProvinceData.cantons.find(
        (canton) => canton.name === exactLocation.selectedCanton
      )
      ? selectedProvinceData.cantons.find(
          (canton) => canton.name === exactLocation.selectedCanton
        ).districts
      : []
    : [];

  const handleLocationChange = (e) => {
    setExactLocation({ ...exactLocation, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    } else {
      setPreviewURL("");
    }
  };

  const handleSubmit = () => {
    const userID = GetUserID();
    if (!userID){
      toast.error("Ha ocurrido un error, Inicie sesión nuevamente", messageSettings)
    }
    try {
      //verificar que todo esté lleno
      // province, canton, district, specificAddress, shippingFee, products, userId, imageUrl
    } catch (error) {
      toast.error("Algo ha salido mal", messageSettings)
    }
  };
  console.log(cartItems);
  return (
    <div className="flex flex-col items-center pb-16">
      <header className="w-full max-w-5xl border-b-2 border-indigo-400 mt-16 pt-8 pb-5 px-5">
        <h1 className="text-indigo-500 text-4xl font-medium">Carrito</h1>
      </header>
      <section className=" w-full max-w-5xl px-5 overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr className="bg-white border-b" key={item.id}>
                  <th className="px-6 py-4 font-medium text-gray-800 flex flex-row gap-3 ">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="max-w-[40px] min-w-[40px] max-h-[40px] min-h-[40px] rounded-full object-cover object-center"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p className="line-clamp-1 font-normal">
                        {item.description}
                      </p>
                    </div>
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-lg ">
                      {formatCurrency(parseInt(item.price) * item.amount)}
                    </p>
                    <p>Por unidad: {formatCurrency(parseInt(item.price))}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-7 h-7 rounded-full bg-green-100 flex justify-center items-center">
                      {item.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex flex-row gap-2 whitespace-nowrap">
                    <button
                      className="text-indigo-500 hover:underline cursor-pointer"
                      onClick={() => increaseProductCart(item.id)}
                    >
                      Agregar otro
                    </button>
                    <button
                      className="text-indigo-500 hover:underline cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <h4 className="px-5 my-7 text-2xl font-medium text-gray-600 w-full max-w-5xl">
        Escriba su ubicación
      </h4>

      <section className=" w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5">
        <div>
          <label className="block mb-2 text-base font-medium text-gray-900 ">
            Seleccione la provincia
          </label>
          <select
            id="selectedProvince"
            value={exactLocation.selectedProvince}
            onChange={handleLocationChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
          >
            <option value="">Selecciona una provincia</option>
            {provinces.map((province) => (
              <option key={province.name} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-gray-900 ">
            Seleccione el cantón
          </label>
          <select
            id="selectedCanton"
            value={exactLocation.selectedCanton}
            onChange={handleLocationChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
          >
            <option value="">Selecciona un cantón</option>
            {cantons.map((canton) => (
              <option key={canton} value={canton}>
                {canton}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-gray-900 ">
            Seleccione el distrito
          </label>
          <select
            id="selectedDistrict"
            value={exactLocation.selectedDistrict}
            onChange={handleLocationChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
          >
            <option value="">Selecciona un distrito</option>
            {districts.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block mb-2 text-base font-medium text-gray-900 ">
            Detalles de la ubicación
          </label>
          <textarea
            id="exact"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full max-h-[120px] min-h-[120px]
         p-2.5 resize-none `}
            placeholder="Dé más detalles de la ubicación donde se entregará el producto"
            required={true}
            onChange={handleLocationChange}
          />
        </div>
      </section>
      <section className="px-5 max-w-5xl w-full mt-5">
        <h2 className="text-lg text-gray-600 font-medium mb-5">
          Adjuntar comprobante de Sinpe Móvil
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          <div className="relative w-full text-center">
            <label className="relative z-0 rounded-lg inline-block w-full bg-indigo-500 hover:bg-indigo-600 transition-colors font-medium cursor-pointer text-white py-2 text-base">
              Subir Imagen
            </label>
            <input
              className="opacity-0 cursor-pointer top-0 left-0 h-12 w-full z-10 absolute inline-block"
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <img
            className="h-56 rounded-md object-cover object-center w-full shadow-md"
            src={previewURL != "" ? previewURL : PlaceholderImage}
          />
        </div>
      </section>
      <section className="px-5 max-w-5xl w-full mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <p className="col-span-1 sm:col-span-2">
          El pedido deberá ser aprobado. Una vez aprobado, le llegará un correo
          notificando la aprobación y mencionando su fecha de entrega.{" "}
          <span className="text-red-500 font-medium">*</span>
        </p>
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors h-11 rounded-md text-white font-medium text-base"
        >
          Finalizar compra
        </button>
      </section>
    </div>
  );
}

export default ShoppingCart;
