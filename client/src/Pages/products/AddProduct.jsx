import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import { messageSettings, defaultError } from "../../utils/messageSettings";
import { toast } from "react-toastify";
import ImagePlaceholder from "../../images/placeholderImage.jpeg";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";
import { CreateProduct } from "../../Structures/addProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [previewURL, setPreviewURL] = useState("");
  const [per, setPerc] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const APIURL = "/api/get_product_category_list";
      try {
        const response = await axios.get(APIURL, { withCredentials: true });
        const TempCategories = response.data;
        const Formated = TempCategories.map((item) => ({
          value: item.description,
          label: item.description,
        }));
        setCategories([{ label: "Seleccione", value: "" }, ...Formated]);
      } catch (error) {
        toast.info("No hay categorías.", messageSettings);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          toast.error("Ocurrió un error al subir la imagen.", messageSettings);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, imageUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const APIURL = "/api/create_product";

    try {
      await axios.post(APIURL, {...data,available: data.available == "true" }, { withCredentials: true });
      toast.success("Producto creado exitosamente.", messageSettings);
      navigate("/shop");
    } catch (error) {
      const errorMessage =
          error?.response?.data?.message ||
          defaultError;
      toast.error(errorMessage, messageSettings);
    }
  };
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14 px-5">
      <header className="w-full max-w-4xl">
        <h1 className="font-semibold text-4xl text-indigo-500">
          Añadir producto
        </h1>
      </header>
      <form
        className="w-full max-w-4xl grid grid-cols-2 gap-10 mt-10 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-2">
          <h4 className="text-xl font-medium text-gray-700 w-full">
            Datos del producto
          </h4>
          <SwitchFormInputs
            HandleChange={handleChange}
            structureForm={CreateProduct}
            data={data}
          />
          <div>
            <label className="block mb-2 text-base font-medium text-gray-900 ">
              Categoría
            </label>
            <select
              id="category"
              onChange={handleChange}
              required={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 block w-full p-2.5 "
            >
              {categories &&
                categories.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-5 mt-4">
            <label className="font-medium">Estado</label>
            <div>
              <input
                type="radio"
                id="available"
                value={true}
                name="state"
                onChange={handleChange}
              />
              <label className="ml-2">Disponible</label>
              <br />
              <input
                type="radio"
                id="available"
                value={false}
                name="state"
                onChange={handleChange}
              />
              <label className="ml-2">No disponible</label>
              <br />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              className="text-lg w-full py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
              type="submit"
              disabled={per < 100 || !per}
            >
              Confirmar
            </button>
            <button
              className="text-lg w-full py-2 rounded-md text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 transition-colors"
              onClick={() => history.back()}
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <label className="text-xl font-medium text-gray-700 w-full">
            Imagen
          </label>
          <img
            src={previewURL ? previewURL : ImagePlaceholder}
            alt="Preview"
            className="rounded-sm w-full object-cover aspect-square"
          />
          <div className="relative w-48 text-center">
            <label className="relative z-0 rounded-lg inline-block w-full bg-indigo-500 font-medium cursor-pointer text-white py-2 text-base">
              Subir imagen
            </label>
            <input
              className="opacity-0 cursor-pointer top-0 left-0 h-12 w-full z-10 absolute inline-block"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
