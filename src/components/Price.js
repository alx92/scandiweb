import React from "react";

export default function Price({ products }) {
  const { amount } = products?.amount;

  return <div>{amount}</div>;
}
