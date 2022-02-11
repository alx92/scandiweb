import React from "react";
import Category from "./Category";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query {
    categories {
      name
      products {
        id
        name
      }
    }
  }
`;

// TODO: how to return conditional data depending on name
const Categories = () => {
  const { data } = useQuery(QUERY);

  return (
    <div>
      {data?.categories?.map((cat) =>
        cat.name === "all" ? (
          <ul key={cat.name}>
            <Category categories={cat} />
          </ul>
        ) : null
      )}
    </div>
  );
};

export default Categories;
