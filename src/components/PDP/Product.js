import React from "react";
import { gql, useQuery } from "@apollo/client";
import QueryResult from "../../utils/QueryResult";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";

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

const Product = () => {
  let params = useParams();
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: params.id },
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <ProductDetail key={data?.product?.id} product={data?.product} />
    </QueryResult>
  );
};

export default Product;
