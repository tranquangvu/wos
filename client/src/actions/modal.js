import env from '../config/env';
import axios from 'axios';
import camelize from 'camelize';
import { setCouponToCart } from './cart';
import { getModifiersFromModifierGroups } from '../utils/item';
import {
  HIDE_MODAL,
  SHOW_MODAL,
  SET_MODIFIER_MODAL_DATA,
  CHECK_COUPON_MODAL_CODE_SUCCESS,
  CHECK_COUPON_MODAL_CODE_FAILURE,
} from '../constants/actionTypes';

export const showModal = (modalType, modalProps) => {
  return { type: SHOW_MODAL, modalType, modalProps }
}

export const hideModal = (modalType) => {
  return { type: HIDE_MODAL, modalType }
}

export const setModifierModalData = (modifierGroups) => {
  let filteredModifierGroups  = modifierGroups.filter(modifierGroup => modifierGroup.modifiers.length > 0)
  let nextModalProps = {
    modifierModal: {
      modifierGroups: filteredModifierGroups,
      modifiers: getModifiersFromModifierGroups(filteredModifierGroups),
    }
  }
  return { type: SET_MODIFIER_MODAL_DATA, modalProps: nextModalProps }
}

export const getModifierModalData = (itemId) => {
  return (dispatch) => {
    axios.get(`${env.API_URL}/items/${itemId}/modifier_groups`).then((response) => {
      const { status, data: { modifierGroups }, error } = camelize(response.data);

      if (status === 'success') {
        dispatch(setModifierModalData(modifierGroups));
      } else {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export const checkCouponModalCode = (couponCode) => {
  return (dispatch) => {
    axios.get(`${env.API_URL}/coupons/find?code=${couponCode}`).then((response) => {
      const { status, data: coupon } = camelize(response.data);

      if (status === 'success' && coupon) {
        dispatch(checkCouponModalCodeSucess());
        dispatch(setCouponToCart(coupon));
      } else {
        dispatch(checkCouponModalCodeFailure('Your coupon code is invalid'));
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

export const checkCouponModalCodeSucess = () => {
  return { type: CHECK_COUPON_MODAL_CODE_SUCCESS };
}

export const checkCouponModalCodeFailure = (error) => {
  return { type: CHECK_COUPON_MODAL_CODE_FAILURE, modalProps: { couponModal: { error } } };
}
