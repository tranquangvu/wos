import { combineReducers } from 'redux-immutable';
import modal from './modal';
import menu from './menu';
import item from './item';
import cart from './cart';
import shop from './shop';
import verify from './verify';

const rootReducer = combineReducers({
  modal,
  menu,
  item,
  cart,
  shop,
  verify,
});

export default rootReducer;
