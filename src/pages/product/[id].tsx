import { useRouter } from "next/router";
import { DivImage, DivProduct, ProductInfo } from "../../styles/pages/product";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import { log } from "console";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imgUrl: string;
    price: string;
    description: string;
    defaultID: string;
  };
}
export default function Product({ product }: ProductProps) {
  console.log("PRODUCT", product);
  function handleBuy() {
    console.log(product.defaultID);
  }

  return (
    <DivProduct>
      <DivImage>
        <Image
          src={product.imgUrl}
          alt="img of product"
          width={520}
          height={480}
        />
      </DivImage>
      <ProductInfo>
        <h2>{product.name}</h2>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuy}>Comprar</button>
      </ProductInfo>
    </DivProduct>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_O82aGUy1bttoZS" } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const id = params.id;

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        imgUrl: product.images[0],
        name: product.name,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultID: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
