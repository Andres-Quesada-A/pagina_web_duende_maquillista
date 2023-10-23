import { useEffect, useState } from "react";
import ImagePlaceholder from "../images/placeholderImage.jpeg";
import { storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { messageSettings } from "../utils/messageSettings";

function UploadImage() {
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
          console.log(error)
          toast.error("Ocurrió un error al subir la imagen", messageSettings);
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
    console.log(selectedFile)
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    } else {
      setPreviewURL("");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center mt-16">
      <img
        src={previewURL ? previewURL : ImagePlaceholder}
        alt="Preview"
        className="rounded-sm w-64 h-64 object-cover"
      />
      <div className="relative w-48 text-center">
        <label className="relative z-0 rounded-lg inline-block w-full bg-indigo-500 font-medium cursor-pointer text-white py-2 text-base">
          Elegir Imagen
        </label>
        <input
          className="opacity-0 cursor-pointer top-0 left-0 h-12 w-full z-10 absolute inline-block"
          id="fileInput"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <section>
        <p>
          <strong>En File: </strong>
          {file && file.name}
        </p>
        <p>
          <strong>Data: </strong>
          {data && data.img}
        </p>
        {per && per < 100 && <p>Cargando...</p>}
      </section>
    </div>
  );
}

export default UploadImage;
