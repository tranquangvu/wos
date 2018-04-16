import { fromJS } from 'immutable';
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

const initialState = fromJS({
  phoneNumber: null,
  phoneVerifyStatus: null,
  phoneVerifyData: null,
  codeNumber: null,
  codeVerifyStatus: null,
  codeVerifyData: null,
  orderType: null,
  classifier: null,
  clientId: null,
  userId: null,
  currentCart: null,
});

const verifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_PHONE_SUCCESS_ORDERING:
      return state.set('phoneNumber', action.phoneNumber)
                  .set('phoneVerifyStatus', action.phoneVerifyStatus)
                  .set('phoneVerifyData', action.phoneVerifyData);
    case VERIFY_PHONE_ERROR_VERIFY:
      return state.set('phoneNumber', action.phoneNumber)
                  .set('phoneVerifyStatus', action.phoneVerifyStatus)
                  .set('phoneVerifyData', action.phoneVerifyData);
    case VERIFY_PHONE_ERROR_REPHONENUMBER:
      return state.set('phoneNumber', action.phoneNumber)
                  .set('phoneVerifyStatus', action.phoneVerifyStatus)
                  .set('phoneVerifyData', action.phoneVerifyData);
    case VERIFY_CODE_SUCCESS_ORDERING:
      return state.set('codeNumber', action.codeNumber)
                  .set('codeVerifyStatus', action.codeVerifyStatus)
                  .set('codeVerifyData', action.codeVerifyData);
    case VERIFY_CODE_ERROR_REVERIFY:
      return state.set('codeNumber', action.codeNumber)
                  .set('codeVerifyStatus', action.codeVerifyStatus)
                  .set('codeVerifyData', action.codeVerifyData);
    case VERIFY_CODE_ERROR_REPHONENUMBER:
      return state.set('codeNumber', action.codeNumber)
                  .set('codeVerifyStatus', action.codeVerifyStatus)
                  .set('codeVerifyData', action.codeVerifyData);
    case SET_VERIFY_DATA: {
      const { phoneNumber, orderType, classifier, clientId, userId } = action;
      return state.set('phoneNumber', phoneNumber)
                  .set('orderType', orderType)
                  .set('classifier', classifier)
                  .set('clientId', clientId)
                  .set('userId', userId);
    }
    case SET_CURRENT_CART_TO_VERIFY:
      return state.set('currentCart', action.currentCart);
    default:
      return state;
  }
};

export default verifyReducer;
