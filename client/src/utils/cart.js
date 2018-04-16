import { findInData } from './common';

// CALCULATING
export const getCartTotalPrice = (itemData, modifierData, orderItems, couponPrice = 0) => {
  let cartPrice = 0;
  orderItems.forEach(orderItem => {
    cartPrice += getItemTotalPrice(itemData, modifierData, orderItem.id, orderItem.quantity, orderItem.modifiers);
  });
  return cartPrice - couponPrice;
}

export const getItemTotalPrice = (itemData, modifierData, itemId, itemQuantity, itemModifiers) => {
  const item = findInData(itemData, itemId);
  let itemTotalPrice = item.price * itemQuantity;

  Object.keys(itemModifiers).forEach(modifierId => {
    itemTotalPrice += getModifierTotalPrice(modifierData, modifierId, itemModifiers[modifierId]);
  });
  return itemTotalPrice;
}

export const getModifierTotalPrice = (modifierData, modifierId, modifierQuantity) => {
  const modifier = findInData(modifierData, modifierId);

  if (!modifier || !modifier.price || !modifierQuantity) {
    return 0;
  }
  return modifier.price * modifierQuantity;
}

export const getOrderItemsCount = (orderItems) => {
  return orderItems.map(orderItem => orderItem.quantity).reduce((a, b) => a + b, 0);
}

// TRANSFORM ORDER ITEMS IN CART
export const findItemInOrderItems = (orderItems, itemId) => {
  return orderItems.find(orderItem => orderItem.id.toString() === itemId.toString());
}

export const addQuantityForItemInOrderItems = (orderItems, itemId, addedQantity) => {
  return orderItems.map(orderItem => {
    if (orderItem.id.toString() === itemId.toString()) {
      orderItem.quantity += addedQantity;
    }
    return orderItem;
  });
}

export const removeItemFromOrderItems = (orderItems, item) => {
  return orderItems.filter(orderItem => {
    return orderItem.id.toString() !== item.id.toString() ||
      JSON.stringify(orderItem.modifiers) !== JSON.stringify(item.modifiers);
  });
}

export const storeOrderItemsToLocalStorage = (orderItems) => {
  localStorage.setItem('orderItems',  JSON.stringify(orderItems));
}

export const getOrderItemsFromLocalStorage = (orderItems) => {
  return JSON.parse(localStorage.getItem('orderItems')) || [];
}

export const deleteOrderItemsFromLocalStorage = () => {
  localStorage.removeItem('orderItems');
}

export const storeCouponCodeToLocalStorage = (couponCode) => {
  localStorage.setItem('couponCode', couponCode);
}

export const getCouponCodeFromLocalStorage = () => {
  return localStorage.getItem('couponCode');
}

export const deleteCouponCodeFromLocalStorage = () => {
  localStorage.removeItem('couponCode');
}

export const storeOrderCodeToLocalStorage = (orderCode) => {
  localStorage.setItem('orderCode', orderCode);
}

export const getOrderCodeFromLocalStorage = () => {
  return localStorage.getItem('orderCode');
}
