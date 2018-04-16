import { fromJS } from 'immutable';
import {
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  START_FETCHING_ITEM,
  END_FETCHING_ITEM,
} from '../constants/actionTypes';
import {
  transformItem,
  getModifiersFromItem,
} from '../utils/item.js';

const initialState = fromJS({
  item: null,
  modifiers: [],
  error: null,
  isFetching: false,
});

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_SUCCESS:
      let item = transformItem(action.item);
      let modifiers = getModifiersFromItem(item);

      return state.set('item', item)
                  .set('modifiers', modifiers);
    case FETCH_ITEM_FAILURE:
      return state.set('error', action.error);
    case START_FETCHING_ITEM:
      return state.set('isFetching', true);
    case END_FETCHING_ITEM:
      return state.set('isFetching', false);
    default:
      return state;
  }
}

export default itemReducer;
