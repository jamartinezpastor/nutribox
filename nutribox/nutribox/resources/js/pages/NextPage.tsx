import { usePage } from "@inertiajs/react";

interface Props {
  termino?: string;
}

export default function NextPage() {
  const { props } = usePage<{ termino?: string }>();
  return <p>Producto: {props.termino ?? "No se ha introducido ningún producto"}</p>;
}
