const catQuery = `query Categories {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
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
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        brand
      }
    }
  }`;

export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";

export const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesError = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  payload: { error },
});

export default function fetchCategories() {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: catQuery,
        }),
      });
      const json = await res.json();
      dispatch(fetchCategoriesSuccess(json.data.categories));
      return json.data.categories;
    } catch (error) {
      return dispatch(fetchCategoriesError(error));
    }
  };
}
