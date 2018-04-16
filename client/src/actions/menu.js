import env from '../config/env';
import axios from 'axios';
import camelize from 'camelize';
import {
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  START_FETCHING_MENU,
  END_FETCHING_MENU
} from '../constants/actionTypes';

export const fetchMenu = () => {
  return (dispatch) => {
    dispatch(startFetchingMenu());

    axios.get(`${env.API_URL}/menu?include_items=true`).then((response) => {
      const { status, data, error } = camelize(response.data);
      const menus = data.menus.sort((a, b) => a.weight - b.weight);

      if (status === 'success') {
        dispatch(fetchMenuSucess(menus));
      } else {
        dispatch(fetchMenuFailure(error));
      }
      dispatch(endFetchingMenu());
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export const fetchMenuSucess = (menu) => {
  return { type: FETCH_MENU_SUCCESS, menu }
}

export const fetchMenuFailure = (error) => {
  return { type: FETCH_MENU_FAILURE, error }
}

export const startFetchingMenu = () => {
  return { type: START_FETCHING_MENU }
}

export const endFetchingMenu = () => {
  return { type: END_FETCHING_MENU }
}
