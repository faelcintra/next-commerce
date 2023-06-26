import { DivImage, DivProduct, ProductInfo } from "../../styles/pages/product";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imgUrl: string;
    price: string;
    description: string;
    defaultId: string;
  };
}
export default function Product({ product }: ProductProps) {
  console.log("PRODUCT", product);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  async function handleBuy() {
    try {
      setIsCreatingCheckoutSession(true);
      const data = await axios.post("/api/checkout", {
        priceId: product.defaultId,
      });

      const { checkoutUrl } = data.data;
      window.location.href = checkoutUrl; // por esse uma aplicação externa do Stripe
      // const router = useRouter()
      // router.push('/cart') sera dessa forma se nao fosse pra uma aplicação externa do Stripe, como por exemplo uma rota estatica para o carrinho
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Next Commerce</title>
      </Head>
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
          <button disabled={isCreatingCheckoutSession} onClick={handleBuy}>
            Comprar
          </button>
        </ProductInfo>
      </DivProduct>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_O82aGUy1bttoZS" } }],
    fallback: "blocking",
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
        defaultId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
