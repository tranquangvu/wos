import { fromJS } from 'immutable';
import {
  FETCH_SHOP_SUCCESS,
  FETCH_SHOP_FAILURE,
} from '../constants/actionTypes';

const initialState = fromJS({
  shops: []
});

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOP_SUCCESS:
      return state.set('shops', action.shops);
    case  FETCH_SHOP_FAILURE:
      return state;
    default:
      return state;
  }
};

export default shopReducer;
