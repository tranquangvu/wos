import { fromJS } from 'immutable';
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
  findItemInOrderItems,
  addQuantityForItemInOrderItems,
  removeItemFromOrderItems,
  storeOrderItemsToLocalStorage,
  getOrderItemsFromLocalStorage,
  deleteOrderItemsFromLocalStorage,
  storeCouponCodeToLocalStorage,
  deleteCouponCodeFromLocalStorage,
  getCouponCodeFromLocalStorage,
  storeOrderCodeToLocalStorage,
  getOrderCodeFromLocalStorage,
} from '../utils/cart';

const initialState = fromJS({
  itemData: [],
  modifierData: [],
  isFetching: false,
  orderItems: getOrderItemsFromLocalStorage(),
  couponCode: getCouponCodeFromLocalStorage(),
  coupon: null,
  shopId: null,
  orderType: null,
  contactName: null,
  contactPhoneNumber: null,
  contactAddress: null,
  currentStep: null,
  checkedOut: false,
  orderCode: getOrderCodeFromLocalStorage(),
  phoneVerified: null,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const { item: addedItem } = action;
      const { id: addedItemId, quantity: addedItemQantity, modifiers: addedItemModifiers } = addedItem;

      let { orderItems: nextOrderItems } = state.toJS();
      let existingOrderItem = findItemInOrderItems(nextOrderItems, addedItemId);

      nextOrderItems = existingOrderItem && JSON.stringify(existingOrderItem.modifiers) === JSON.stringify(addedItemModifiers)
        ? addQuantityForItemInOrderItems(nextOrderItems, addedItemId, addedItemQantity)
        : [...nextOrderItems, addedItem];

      storeOrderItemsToLocalStorage(nextOrderItems);

      return state.set('orderItems', nextOrderItems);
    }
    case REMOVE_ITEM_FROM_CART: {
      let filteredOrderItems = removeItemFromOrderItems(state.toJS().orderItems, action.item);
      storeOrderItemsToLocalStorage(filteredOrderItems);

      return state.set('orderItems', filteredOrderItems);
    }
    case SET_ITEM_DATA:
      return state.set('itemData', action.itemData);
    case SET_MODIFIER_DATA:
      return state.set('modifierData', action.modifierData);
    case START_FETCHING_CART_DATA:
      return state.set('isFetching', true);
    case END_FETCHING_CART_DATA:
      return state.set('isFetching', false);
    case SET_COUPON_TO_CART: {
      const { coupon } = action;
      storeCouponCodeToLocalStorage(coupon.code);
      return state.set('couponCode', coupon.code)
                  .set('coupon', coupon);
    }
    case SET_SHOP_TO_CART:
      return state.set('shopId', action.shopId);
    case SET_ORDER_TYPE_TO_CART:
      return state.set('orderType', action.orderType);
    case SET_CONTACT_INFO_TO_CART: {
      const { contactName, contactPhoneNumber, contactAddress } = action;
      return state.set('contactName', contactName)
                  .set('contactPhoneNumber', contactPhoneNumber)
                  .set('contactAddress', contactAddress);
    }
    case SET_CURRENT_STEP_TO_CART:
      return state.set('currentStep', action.stepName);
    case COMPLETE_CART_CHECKOUT:
      deleteOrderItemsFromLocalStorage();
      deleteCouponCodeFromLocalStorage();
      storeOrderCodeToLocalStorage(action.orderCode);

      return state.set('orderItems', [])
                  .set('coupon', null)
                  .set('couponCode', null)
                  .set('checkedOut', true)
                  .set('orderCode', action.orderCode);
    case SET_PHONE_VERIFIED_TO_CART:
      return state.set('phoneVerified', action.phoneVerified);
    default:
      return state;
  }
};

export default cartReducer;
