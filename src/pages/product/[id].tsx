import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();
  console.log(query.id);
  return <h1>Product {JSON.stringify(query.id)}</h1>;
}
