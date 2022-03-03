import React from "react";
import Category from "./Category";
import { useQuery, gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Categories {
    categories {
      name
      products {
        id
        name
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;

const Categories = (props) => {
  const { data } = useQuery(CATEGORIES);

  const result = data?.categories?.filter((cat) => cat.name === props.name);

  return (
    <div>
      {result?.map((cat) => (
        <div key={cat.name}>
          <Category categories={cat} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
