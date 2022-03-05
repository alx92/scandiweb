import {
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
} from "../actions/productActions";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

export default function prodReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        product: {},
      };

    default:
      return state;
  }
}
