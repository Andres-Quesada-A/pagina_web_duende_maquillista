import { useNavigate } from "react-router-dom";
import { Plane } from "../Icons";

function ImageCard({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gallery/${item.id}`);
  };
  return (
    <picture
      onClick={handleClick}
      className="[&:hover>div]:opacity-100 relative rounded-md overflow-hidden"
    >
      <div className="w-full h-full  bg-black/20 backdrop-blur-sm opacity-0 transition-all absolute top-0 left-0">
        <div className="absolute bottom-3 right-3 bg-gray-200 w-16 h-16 rounded-md flex justify-center items-center cursor-pointer">
          <Plane className="text-gray-600 w-10 h-10" />
        </div>
      </div>
      <img src={item.image_url} className="aspect-square object-cover" />
    </picture>
  );
}

export default ImageCard;
