import _ from 'lodash';
import env from '../config/env';
import axios from 'axios';
import camelize from 'camelize';
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_ITEM_DATA,
  SET_MODIFIER_DATA,
  START_FETCHING_CART_DATA,
  END_FETCHING_CART_DATA,
  SET_COUPON_TO_CART,
  SET_SHOP_TO_CART,
  SET_ORDER_TYPE_TO_CART,
  SET_CONTACT_INFO_TO_CART,
  SET_CURRENT_STEP_TO_CART,
  SET_PHONE_VERIFIED_TO_CART,
  COMPLETE_CART_CHECKOUT,
} from '../constants/actionTypes';
import {
  getCartTotalPrice,
} from '../utils/cart.js';

export const addToCart = (item) => {
  return (dispatch) => {
    dispatch(addItemToCart(item));
  }
}

export const fetchItemData = (ids) => {
  return axios.get(`${env.API_URL}/items?ids=${ids.join(',')}`);
}

export const fetchModifierData = (ids) => {
  return axios.get(`${env.API_URL}/modifiers?ids=${ids.join(',')}`);
}

export const fetchItemAndModifierData = (itemIds, modifierIds) => {
  return (dispatch) => {
    // start fetching data
    dispatch(startFetchingCartData());

    // fetch item data
    if (itemIds.length) {
      fetchItemData(itemIds).then(response => {
        const { status: itemDataResponseStatus, data: itemData, error: itemDataResponseError } = camelize(response.data);

        if (itemDataResponseStatus === 'success') {
          dispatch(setItemData(itemData));
        } else {
          console.log(itemDataResponseError);
        }
      }).catch(error => {
        console.log(error);
      })
    }

    // fetch modifier data
    if (modifierIds.length) {
      fetchModifierData(modifierIds).then(response => {
        const { status: modifierDataResponseStatus, data: modifierData, error: modifierDataResponseError } = camelize(response.data);

        if (modifierDataResponseStatus === 'success') {
          dispatch(setModifierData(modifierData));
        } else {
          console.log(modifierDataResponseError);
        }
      }).catch(error => {
        console.log(error);
      })
    }

    // end fetching data
    dispatch(endFetchingCartData());
  }
}

export const checkCouponCode = (couponCode) => {
  return (dispatch) => {
    axios.get(`${env.API_URL}/coupons/find?code=${couponCode}`).then((response) => {
      const { status, data: coupon } = camelize(response.data);
      if (status === 'success' && coupon) {
        dispatch(setCouponToCart(coupon));
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

export const setCouponToCart = (coupon) => {
  return { type: SET_COUPON_TO_CART, coupon };
}

export const addItemToCart = (item) => {
  return { type: ADD_ITEM_TO_CART, item };
}

export const removeItemFromCart = (item) => {
  return { type: REMOVE_ITEM_FROM_CART, item };
}

export const setItemData = (itemData)  => {
  return { type: SET_ITEM_DATA, itemData };
}

export const setModifierData = (modifierData) => {
  return { type: SET_MODIFIER_DATA, modifierData };
}

export const startFetchingCartData = () => {
  return { type: START_FETCHING_CART_DATA };
}

export const endFetchingCartData = () => {
  return { type: END_FETCHING_CART_DATA };
}

export const setShopToCart = (shopId) => {
  return { type: SET_SHOP_TO_CART, shopId };
}

export const setOrderTypeToCart = (orderType) => {
  return { type: SET_ORDER_TYPE_TO_CART, orderType };
}

export const setContactInfoToCart = (contactName, contactPhoneNumber, contactAddress) => {
  return {
    type: SET_CONTACT_INFO_TO_CART,
    contactName,
    contactPhoneNumber,
    contactAddress
  }
}

export const setOrderTypeAndConactInfoToCart = (orderType, contactInfo = {}) => {
  return (dispatch) => {
    dispatch(setOrderTypeToCart(orderType));

    if (orderType === 'delivery') {
      const { contactName, contactPhoneNumber, contactAddress } = contactInfo;
      dispatch(setContactInfoToCart(contactName, contactPhoneNumber, contactAddress))
    }
  }
}

export const setCurrentStepToCart = (stepName) => {
  return { type: SET_CURRENT_STEP_TO_CART, stepName };
}

export const finishCartCheckOut = () => {
  return (dispatch, getState) => {
    const { cart, verify } = getState().toJS();
    const { itemData, modifierData, coupon, orderItems } = cart;

    const couponPrice = coupon ? coupon.price : 0;
    const totalAmount = getCartTotalPrice(itemData, modifierData, orderItems, couponPrice).toFixed(2);

    // build params to send request
    let order = {
      "contact_name": cart.contactName || '',
      "contact_phone_number": cart.contactPhoneNumber || '',
      "contact_address": cart.contactAddress || '',
      "order_type": cart.orderType,
      "shop_id": cart.shopId,
      "total_amount": totalAmount,
      "order_items_attributes": buildOrderItemsAttributesFromCart(cart),
    }
    if (cart.couponCode) {
      order["order_coupon_attributes"] = {
        coupon_id: cart.coupon.id
      }
    }

    // send request
    axios.post(`${env.API_URL}/orders/complete `, {
      "phone_number": verify.phoneNumber,
      order
    })
    .then(response => {
      const { status, data: order, error } = camelize(response.data);

      if (status === 'success') {
        dispatch(completeCartCheckOut(order.code));
      } else {
        console.log(error);
      }
    }).catch(error => {
      console.log(error);
    });
  }
};

export const completeCartCheckOut = (orderCode) => {
  return { type: COMPLETE_CART_CHECKOUT, orderCode };
}

const buildOrderItemsAttributesFromCart = (cart) => {
  return cart.orderItems.map(orderItem => ({
      "item_id": orderItem.id,
      "quantity": orderItem.quantity,
      "order_item_modififers_attributes": buildOrderItemModififersAttributesFromItem(orderItem,)
    }
  ));
}

const buildOrderItemModififersAttributesFromItem = (item) => {
  return _.keys(item.modifiers).map((modiferId, index) => ({
      "modifier_id":  modiferId,
      "quantity": item.modifiers[modiferId],
    }
  ));
}

export const setPhoneVerifiedToCart = (phoneVerified) => {
  return { type: SET_PHONE_VERIFIED_TO_CART, phoneVerified }
}
