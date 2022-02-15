import React from "react";
import { gql, useQuery } from "@apollo/client";
import QueryResult from "../QueryResult";
import ProductCardDetail from "./ProductCardDetail";
import { useParams } from "react-router-dom";

//data.categories[0].products[0].name;

//return <Layout grid>{JSON.stringify(data)}</Layout>;

export const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      description
      prices {
        amount
        currency {
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;

const ProductCard = () => {
  let params = useParams();
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: params.id },
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <ProductCardDetail key={data?.product?.id} product={data?.product} />
    </QueryResult>
  );
};

export default ProductCard;
