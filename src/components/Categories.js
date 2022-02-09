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

const Categories = () => {
  const { data } = useQuery(QUERY);

  return (
    <div>
      {data?.categories?.map((cat) => (
        <ul key={cat.name}>
          <Category categories={cat} />
        </ul>
      ))}
    </div>
  );
};

export default Categories;
