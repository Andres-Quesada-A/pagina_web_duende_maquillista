import Image from "../images/frontPage.jpg";
import AboutUsImage from "../images/305580296_623109456104601_3151715858796774218_n.jpg";
import Image1 from "../images/119020012_3154192791374619_2266714460925129479_n.jpg";
import Image2 from "../images/280264391_4921823831278164_7136736824666213806_n.jpg";
import Image3 from "../images/305580296_623109456104601_3151715858796774218_n.jpg";
import Product1 from "../images/164742965_3683075388486354_133783467351755060_n.jpg";
import Product2 from "../images/164981336_3683075461819680_1648894253421397887_n.jpg";
import Product3 from "../images/165280182_3683075525153007_549197379267545938_n.jpg";

function Home() {
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
          Tienda de duende
        </h2>
        <div className="grid grid-cols-3 w-full max-w-4xl gap-5 mx-auto mb-10">
          <img src={Product1} className="aspect-square rounded-md object-cover shadow-md" />
          <img src={Product2} className="aspect-square rounded-md object-cover shadow-md" />
          <img src={Product3} className="aspect-square rounded-md object-cover shadow-md" />
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
        <div className="grid grid-cols-3 w-full max-w-4xl gap-5 mx-auto mb-10">
          <img src={Image1} className="aspect-square rounded-md object-cover " />
          <img src={Image2} className="aspect-square rounded-md object-cover " />
          <img src={Image3} className="aspect-square rounded-md object-cover " />
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
