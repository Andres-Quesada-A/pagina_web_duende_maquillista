import Image1 from '../images/119020012_3154192791374619_2266714460925129479_n.jpg'
import Image2 from '../images/280264391_4921823831278164_7136736824666213806_n.jpg'
import Image3 from '../images/305580296_623109456104601_3151715858796774218_n.jpg'
function AboutUs() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-16 py-16 px-5">
      <header className="w-full max-w-4xl">
        <h1 className="text-4xl font-semibold text-indigo-500">Sobre mí</h1>
      </header>
      <section className="max-w-4xl w-full grid grid-cols-2 gap-7 mt-10">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas,
          ducimus nam quisquam commodi nemo libero laborum amet ea laboriosam
          non, laudantium corporis cum aperiam a perferendis, quia omnis
          molestias quo.
        </p>
        <img src={Image1}  className='aspect-video rounded-md object-cover '/>
        <img src={Image2}  className='aspect-video rounded-md object-cover '/>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
          veritatis quidem eos, consectetur earum unde quod sit laudantium
          maxime placeat itaque asperiores beatae porro natus aperiam! Cumque
          similique praesentium quis dolor consequuntur quos cupiditate fugiat.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut aliquam
          ipsam incidunt omnis dolorem recusandae dicta corrupti fuga architecto
          enim.
        </p>
        <img src={Image3} className='aspect-video rounded-md object-cover '/>
      </section>
    </div>
  );
}

export default AboutUs;
