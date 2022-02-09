import React from "react";
import { gql, useQuery } from "@apollo/client";

import QueryResult from "./QueryResult";
import ProductDetail from "./ProductDetail";

//data.categories[0].products[0].name;

//return <Layout grid>{JSON.stringify(data)}</Layout>;

const QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      gallery
    }
  }
`;

const ProductCard = ({ id }) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id },
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <ProductDetail product={data?.product} />
    </QueryResult>
  );
};

export default ProductCard;
