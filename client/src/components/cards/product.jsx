function Product({ id, imageUrl, name, description, available, price }) {
  return (
    <a href={`/shop/${id}`}>
      <article className="shadow-[0px_0px_10px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden">
        <picture className="">
          <img src={imageUrl} className="object-cover object-center h-56 w-full" />
        </picture>
        <div className="py-5 px-5">
          <h4 className="font-semibold text-gray-600 text-lg mb-2">{name}</h4>
          <p className="text-sm mb-2 line-clamp-2">{description}</p>
          <p className="text-gray-600 font-semibold">{
            available ? "Disponible" : "No Disponible"
          }</p>
          <p className="text-2xl text-gray-600 font-semibold flex justify-end gap-1">
            <span className="text-xs">₡</span>
            {price}
          </p>
        </div>
      </article>
    </a>
  );
}

export default Product;
