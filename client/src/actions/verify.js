import _ from 'lodash';
import env from '../config/env';
import axios from 'axios';
import camelize from 'camelize';

import {
  VERIFY_PHONE_SUCCESS_ORDERING,
  VERIFY_PHONE_ERROR_VERIFY,
  VERIFY_PHONE_ERROR_REPHONENUMBER,
  VERIFY_CODE_SUCCESS_ORDERING,
  VERIFY_CODE_ERROR_REVERIFY,
  VERIFY_CODE_ERROR_REPHONENUMBER,
  SET_VERIFY_DATA,
  SET_CURRENT_CART_TO_VERIFY,
} from '../constants/actionTypes';

export const verifyPhone = (phoneNumber) => {
  return (dispatch) => {
    // Hacking to verify phone
    dispatch(verifyPhoneSuccessOrdering(phoneNumber, 'success', 'ordering'));

    // Use verify phone API
    // axios.get(`${env.API_URL}/crms/verify_contact?phone_number=${phoneNumber}&target=web`).then(response => {
    //   const { status, data } = camelize(response.data);

    //   if (status === 'success' && data ==='ordering') {
    //     dispatch(verifyPhoneSuccessOrdering(phoneNumber, status, data));
    //   }

    //   if (status === 'error' && data === 'verify') {
    //     dispatch(verifyPhoneErrorVerify(phoneNumber, status, data));
    //   }

    //   if (status === 'error' && data === 'rephonenumber') {
    //     dispatch(verifyPhoneErrorRephonenumber(phoneNumber, status, data));
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }
}

export const verifyPhoneSuccessOrdering = (phoneNumber, phoneVerifyStatus, phoneVerifyData) => {
  return { type: VERIFY_PHONE_SUCCESS_ORDERING, phoneNumber, phoneVerifyStatus, phoneVerifyData }
}

export const verifyPhoneErrorVerify = (phoneNumber, phoneVerifyStatus, phoneVerifyData) => {
  return { type: VERIFY_PHONE_ERROR_VERIFY, phoneNumber, phoneVerifyStatus, phoneVerifyData }
}

export const verifyPhoneErrorRephonenumber = (phoneNumber, phoneVerifyStatus, phoneVerifyData) => {
  return { type: VERIFY_PHONE_ERROR_REPHONENUMBER, phoneNumber, phoneVerifyStatus, phoneVerifyData }
}

export const verifyCode = (codeNumber) => {
  return (dispatch, getState) => {
    const { phoneNumber } = getState().toJS().verify;

    axios.get(`${env.API_URL}/crms/confirm_register?phone_number=${phoneNumber}&auth_code=${codeNumber}&target=web`)
    .then(response => {
      const { status, data } = camelize(response.data);

      if (status === 'success' && data ==='ordering') {
        dispatch(verifyCodeSuccessOrdering(codeNumber, status, data));
      }

      if (status === 'error' && data === 'reverify') {
        dispatch(verifyCodeErrorReVerify(codeNumber, status, data));
      }

      if (status === 'error' && data === 'rephonenumber') {
        dispatch(verifyCodeErrorRephonenumber(codeNumber, status, data));
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const verifyCodeSuccessOrdering = (codeNumber, codeVerifyStatus, codeVerifyData) => {
  return { type: VERIFY_CODE_SUCCESS_ORDERING, codeNumber, codeVerifyStatus, codeVerifyData }
}

export const verifyCodeErrorReVerify = (codeNumber, codeVerifyStatus, codeVerifyData) => {
  return { type: VERIFY_CODE_ERROR_REVERIFY, codeNumber, codeVerifyStatus, codeVerifyData }
}

export const verifyCodeErrorRephonenumber = (codeNumber, codeVerifyStatus, codeVerifyData) => {
  return { type: VERIFY_CODE_ERROR_REPHONENUMBER, codeNumber, codeVerifyStatus, codeVerifyData }
}

export const setVerifyData = (data) => {
  return { type: SET_VERIFY_DATA, ...data }
}

export const setVerifyAndCurrentCartData = (data) => {
  return (dispatch, getState) => {
    dispatch(setVerifyData(data));

    const { currentCart } = getState().toJS().verify;
    if (!currentCart) {
      dispatch(requestCurrentCart(data));
    }}
}

export const requestCurrentCart = (data) => {
  return (dispatch) => {
    const { phoneNumber, orderType, classifier, clientId, userId } = data;

    axios.get(`${env.API_URL}/orders/current`, {
      params: {
        "phone_number": phoneNumber,
        "order_type": orderType,
        "classifier": classifier,
        "client_id": clientId,
        "user_id": userId,
      }
    })
    .then(response => {
      const { status, data: currentCart, error } = camelize(response.data);

      if (status === 'success') {
        dispatch(setCurrentCartToVerify(currentCart));
      } else {
        console.log(error);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const setCurrentCartToVerify = (currentCart) => {
  return { type: SET_CURRENT_CART_TO_VERIFY, currentCart }
}
