import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { HomeContainer, Product } from "../styles/home";

import tshirt1 from "../../public/tshirts/tshirt_1.jpg";
import tshirt2 from "../../public/tshirts/tshirt_2.jpg";
import tshirt3 from "../../public/tshirts/tshirt_3.jpg";
import tshirt4 from "../../public/tshirts/tshirt_4.jpg";

export default function Home() {
  const [slideRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing:48
    },
  });
  return (
    <HomeContainer ref={slideRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={tshirt1} alt="img product" width={520} height={480} />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 69,99</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={tshirt2} alt="img product" width={520} height={480} />
        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 69,99</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={tshirt3} alt="img product" width={520} height={480} />
        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 69,99</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={tshirt4} alt="img product" width={520} height={480} />
        <footer>
          <strong>Camiseta 4</strong>
          <span>R$ 69,99</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
