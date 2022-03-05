const prodQuery = `query Product($id: String!) {
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
  }`;

export const FETCH_PRODUCT_START = "FETCH_PRODUCT_START";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR";

export const fetchProductStart = () => ({
  type: FETCH_PRODUCT_START,
});

export const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductError = (error) => ({
  type: FETCH_PRODUCT_ERROR,
  payload: { error },
});

export default function fetchProduct(prodId) {
  return async (dispatch) => {
    dispatch(fetchProductStart(prodId));
    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: prodQuery,
          variables: { id: prodId },
        }),
      });
      const json = await res.json();
      dispatch(fetchProductSuccess(json.data));
      return json.data;
    } catch (error) {
      return dispatch(fetchProductError(error));
    }
  };
}
