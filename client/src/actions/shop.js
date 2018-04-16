import env from '../config/env';
import axios from 'axios';
import camelize from 'camelize';
import {
  FETCH_SHOP_SUCCESS,
  FETCH_SHOP_FAILURE,
} from '../constants/actionTypes';

export const fetchShop = () => {
  return (dispatch) => {
    axios.get(`${env.API_URL}/shops`).then(response => {
      const { status, data: shops, error } = camelize(response.data);

      if (status === 'success') {
        dispatch(fetchShopSuccess(shops));
      } else {
        dispatch(fetchShopFailure(error));
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

export const fetchShopSuccess = (shops) => {
  return { type: FETCH_SHOP_SUCCESS, shops };
}

export const fetchShopFailure = (error) => {
  return { type: FETCH_SHOP_FAILURE, error };
}
