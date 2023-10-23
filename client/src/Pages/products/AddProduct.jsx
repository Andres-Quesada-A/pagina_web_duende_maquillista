import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import { messageSettings } from "../../utils/messageSettings";
import { toast } from "react-toastify";
import ImagePlaceholder from "../../images/placeholderImage.jpeg";
import SwitchFormInputs from "../../components/form/SwitchFormInputs";
import { CreateProduct } from "../../Structures/addProduct";

function AddProduct() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [previewURL, setPreviewURL] = useState("");
  const [per, setPerc] = useState(null);

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
          toast.error("Could not upload image", messageSettings);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
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

  const handleChage = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        
    } catch (error) {
        
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-14">
      <header className="w-full max-w-4xl">
        <h1 className="font-medium text-3xl text-indigo-500">
          Añadir producto
        </h1>
        <hr className="border-indigo-500 border-1 mt-2"></hr>
      </header>
      <form className="w-full max-w-4xl grid grid-cols-2 gap-10 mt-10 pb-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-2">
          <h4 className="text-xl font-medium text-gray-700 w-full">Datos del producto</h4>
          <SwitchFormInputs
            HandleChange={handleChage}
            structureForm={CreateProduct}
            data={data}
          />
          <div className="flex gap-5 mt-4">
            <label className="font-medium">Estado</label>
            <div>
              <input
                type="radio"
                id="state"
                value="1"
                name="state"
                onChange={handleChage}
              />
              <label className="ml-2">Disponible</label>
              <br />
              <input
                type="radio"
                id="state"
                value="0"
                name="state"
                onChange={handleChage}
              />
              <label className="ml-2">No disponible</label>
              <br />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button className="text-lg w-full py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition-colors" type="submit" >Confirmar</button>
            <button className="text-lg w-full py-2 rounded-md text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 transition-colors" onClick={() => history.back()}>Cancelar</button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <label className="text-xl font-medium text-gray-700 w-full">Imagen</label>
          <img
            src={previewURL ? previewURL : ImagePlaceholder}
            alt="Preview"
            className="rounded-sm w-full object-cover aspect-square"
          />
          <div className="relative w-48 text-center">
            <label className="relative z-0 rounded-lg inline-block w-full bg-indigo-500 font-medium cursor-pointer text-white py-2 text-base">
              Subir Imagen
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