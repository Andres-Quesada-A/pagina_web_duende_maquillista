import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from 'axios';


function ImageGallery() {
  const { idImage } = useParams();
  const [imageData, setImageData] = useState({});

  
  function handlerbutton(){
    const email = "duendemaquillista@gmail.com";
    const password = "xxx-yyy-zzz"

    // whatever is need it so send the email goes here
  }


  const HandleChange = (e) => {
    //vacio por el momento
  };

  useEffect(() => {
    
    const apiImageURL = 'http://localhost:1234/api/get_image_list'

    axios.get(apiImageURL, { withCredentials: true }).then((response) => {
      const dataImage = response.data;
    
      //codigo no relevante
      const foundImage = dataImage.find(
        (image) => image.id === parseInt(idImage)
      );
      if (foundImage) setImageData(foundImage);
    });
    
  }, [idImage]);

  console.log(imageData);
  return (
    <>
      <Helmet>
        <title>Galería de Duende</title>
        <meta
          name="description"
          content="Visite nuestra galería y descubra todos nuestros servicios disponibles"
        />
        <link rel="canonical" href="/shop" />
      </Helmet>
      <section className="min-h-screen flex mt-16 py-20 px-5">
        {imageData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl mx-auto">
            <picture>
              <img
                src={imageData.imageUrl}
                className="rounded-md aspect-ratio-1/1 object-cover w-full max-w-md max-h-[500px]"
              />
            </picture>
            <div className="flex flex-col gap-4 [&>p>span]:font-medium">
              <h1 className="text-2xl font-medium text-gray-600">
                {imageData.name}
              </h1>
              <p><span>Descripción:</span> {imageData.description}</p>
              <p><span>Categoría:</span> {imageData.category}</p>
              <p><span>Subcategoría:</span> {imageData.subcategory}</p>
              <p><span>Etiquetas:</span></p>
              <p className="text-indigo-500 -mt-4">{imageData.tags}</p>
              <button onClick={handlerbutton} className="h-11 w-full sm:w-auto rounded-lg px-5 text-white font-medium text-lg bg-indigo-500 hover:bg-indigo-400 transition-colors">
                Enviar solicitud de servicio
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ImageGallery;
