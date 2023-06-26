import Link from "next/link";
import { DivImage, DivSuccess } from "../styles/pages/success";
import Head from "next/head";

import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { GetServerSideProps } from "next";

interface SuccessProps {
  name: string;
  product: {
    name: string;
    imgUrl: string;
  };
}
export default function Success({ name, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title> Success | Next Commerce</title>
        <meta name="robots" content="noindex" />
      </Head>
      <DivSuccess>
        <h1>Compra efetuada com sucesso!</h1>
        <DivImage>
          <Image src={product.imgUrl} width={120} height={110} alt={""} />`
        </DivImage>
        <p>
          Parabens <strong>{name}</strong>! Sua <strong>{product.name}</strong>{" "}
          já está a caminho da sua casa.
        </p>
        <Link href={"/"}>Voltar ao inicio</Link>
      </DivSuccess>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // const { session_id } = query;
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const SESSION_ID = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(SESSION_ID, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const name = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;
  return {
    props: {
      name,
      product: {
        name: product.name,
        imgUrl: product.images[0],
      },
    },
  };
};
