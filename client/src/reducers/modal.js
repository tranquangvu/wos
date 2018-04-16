import { fromJS } from 'immutable';
import * as modalTypes from '../constants/modalTypes';
import {
  HIDE_MODAL,
  SHOW_MODAL,
  SET_MODIFIER_MODAL_DATA,
  CHECK_COUPON_MODAL_CODE_SUCCESS,
  CHECK_COUPON_MODAL_CODE_FAILURE,
} from '../constants/actionTypes';

const initialState = fromJS({
  visible: false,
  modalType: null,
  modalProps: {
    modifierModal: {},
    couponModal: {},
  }
})

const modalReducer = (state = initialState, action) => {
  const { modalProps: stateModalProps } = state.toJS();

  switch (action.type) {
    case HIDE_MODAL:
      return state.set('visible', false)
                  .set('modalType', action.modalType);
    case SHOW_MODAL:
      return state.set('visible', true)
                  .set('modalType', action.modalType)
                  .set('modalProps', getNextModalProps(
                    action.modalType,
                    stateModalProps,
                    action.modalProps
                  ));
    case SET_MODIFIER_MODAL_DATA:
      return state.set('modalProps', getNextModalProps(
                    modalTypes.MODIFIER_MODAL,
                    stateModalProps,
                    action.modalProps
                  ));
    case CHECK_COUPON_MODAL_CODE_SUCCESS:
      return state.set('visible', false)
                  .set('modalProps', getNextModalProps(
                    modalTypes.COUPON_MODAL,
                    stateModalProps,
                    { couponModal: { error: null } }
                  ));
    case CHECK_COUPON_MODAL_CODE_FAILURE:
      return state.set('modalProps', getNextModalProps(
                    modalTypes.COUPON_MODAL,
                    stateModalProps,
                    action.modalProps
                  ));
    default:
      return state;
  }
}

const getNextModalProps = (modalType, prevModalProps, actionModalProps) => {
  switch (modalType) {
    case modalTypes.MODIFIER_MODAL:
      return {
        ...prevModalProps,
        modifierModal: {
          ...prevModalProps.modifierModal,
          ...actionModalProps.modifierModal
        }
      }
    case modalTypes.COUPON_MODAL:
      return {
        ...prevModalProps,
        couponModal: {
          ...prevModalProps.couponModal,
          ...actionModalProps.couponModal
        }
      }
    default:
      return prevModalProps;
  }
}

export default modalReducer;
