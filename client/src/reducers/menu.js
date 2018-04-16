import { fromJS } from 'immutable';
import {
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  START_FETCHING_MENU,
  END_FETCHING_MENU
} from '../constants/actionTypes';

const initialState = fromJS({
  menu: [],
  error: null,
  isFetching: false
});

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
      let menu = action.menu.filter(group => group.items.length > 0);
      return state.set('menu', menu);
    case FETCH_MENU_FAILURE:
      return state.set('error', action.error);
    case START_FETCHING_MENU:
      return state.set('isFetching', true);
    case END_FETCHING_MENU:
      return state.set('isFetching', false);
    default:
      return state;
  }
}

export default menuReducer;
