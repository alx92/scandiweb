import React from "react";
import { gql, useQuery } from "@apollo/client";
import QueryResult from "../components/QueryResult";
import CategoryType from "./CategoryType";

const CAT_QUERY = gql`
  query Category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
      }
    }
  }
`;

const CategoryPage = ({ input }) => {
  const { loading, error, data } = useQuery(CAT_QUERY, {
    variables: { input },
  });

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <CategoryType name={input} category={data?.category} />
    </QueryResult>
  );
};

export default CategoryPage;
