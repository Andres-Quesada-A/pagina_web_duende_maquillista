import Image from "../images/frontPage.jpg";
import AboutUsImage from "../images/305580296_623109456104601_3151715858796774218_n.jpg";
import ProductCard from "../components/cards/product";
import ImageCard from "../components/cards/ImageCard";
import axios from "axios";
import { useEffect, useState } from "react";

const IMAGE_AND_PRODUCT_LIMIT = 3;

function Home() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  // Retrieve images and products
  useEffect(() => {
    const apiImageURL = `/api/get_image_list?limit=${IMAGE_AND_PRODUCT_LIMIT}`;
    const apiProductURL = `/api/get_product_list?limit=${IMAGE_AND_PRODUCT_LIMIT}`;

    axios
      .get(apiImageURL, { withCredentials: true })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(apiProductURL, { withCredentials: true })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16">
      <img src={Image} className="aspect-video object-cover" />
      <section className="max-w-4xl w-full grid grid-cols-2 gap-5 px-5 py-16">
        <div className="">
          <h2 className="text-indigo-500 font-medium text-4xl mb-5">
            Sobre mí
          </h2>
          <p className="mb-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            incidunt, similique explicabo rerum qui blanditiis voluptate rem
            enim nisi ut?
          </p>
          <a href="/about-us">
            <div className="w-60 bg-indigo-500 rounded-md text-white font-medium py-2 text-center">
              Ver más
            </div>
          </a>
        </div>
        <img
          src={AboutUsImage}
          className="h-72 w-full object-cover rounded-md "
        />
      </section>
      <section className="w-full grid gap-5 px-5 py-16 bg-gray-100 grid-cols-1">
        <h2 className="text-indigo-500 font-medium text-4xl mb-5 text-center w-full">
          Tienda de Duende
        </h2>
        <div className={`grid grid-cols-${Math.min(3, products.length)} w-full max-w-4xl gap-5 mx-auto mb-10`}>
          {
            products.length ?
            products.map((product) => 
              <ProductCard
                id={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                available={product.available}
                price={product.price}
                admin={false}
                deleteProduct={() => {}}
              />
            )
            : <></>
          }
        </div>
        <a href="/shop" className="w-60 flex mx-auto">
            <div className="w-60 bg-indigo-500 rounded-md text-white font-medium py-2 text-center">
              Ver tienda
            </div>
          </a>
      </section>
      <section className="w-full grid gap-5 px-5 py-16 bg-white grid-cols-1">
        <h2 className="text-indigo-500 font-medium text-4xl mb-5 text-center w-full">
          Galería
        </h2>
        <div className={`grid grid-cols-${Math.min(3, images.length)} w-full max-w-4xl gap-5 mx-auto mb-10`}>
          {
            images.length ?
            images.map((image) => 
              <ImageCard
                item={image}
              />
            )
            : <></>
          }
        </div>
        <a href="/gallery" className="w-60 flex mx-auto">
            <div className="w-60 bg-indigo-500 rounded-md text-white font-medium py-2 text-center">
              Ver galería
            </div>
          </a>
      </section>
    </div>
  );
}

export default Home;
