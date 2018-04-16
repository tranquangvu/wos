import env from '../config/env';
import axios from 'axios';
import camelize from 'camelize';
import {
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  START_FETCHING_ITEM,
  END_FETCHING_ITEM
} from '../constants/actionTypes';

export const fetchItem = (itemId) => {
  return (dispatch) => {
    dispatch(startFetchingItem());

    axios.get(`${env.API_URL}/items/${itemId}?include_modifier_groups=true`).then((response) => {
      const { status, data: { item }, error } = camelize(response.data);

      if (status === 'success') {
        dispatch(fetchingItemSuccess(item));
      } else {
        dispatch(fetchingItemFailure(error));
      }
      dispatch(endFectchingItem());
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export const fetchingItemSuccess = (item) => {
  return { type: FETCH_ITEM_SUCCESS, item }
}

export const fetchingItemFailure = (error) => {
  return { type: FETCH_ITEM_FAILURE, error }
}

export const startFetchingItem = () => {
  return { type: START_FETCHING_ITEM }
}

export const endFectchingItem = () => {
  return { type: END_FETCHING_ITEM }
}
