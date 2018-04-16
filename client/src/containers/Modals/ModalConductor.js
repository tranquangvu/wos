import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModifierModal from './ModifierModal';
import CouponModal from './CouponModal'
import * as modalTyes from '../../constants/modalTypes';

class ModalConductor extends Component {
  render() {
    const { modalType, modalProps } = this.props

    switch (modalType) {
      case modalTyes.MODIFIER_MODAL:
        return <ModifierModal {...modalProps} />;
      case modalTyes.COUPON_MODAL:
        return <CouponModal {...modalProps} />;
      default:
        return null;
    }
  }
}

ModalConductor.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object
}

const mapStateToProps = (state) => {
  const { modalType, modalProps } = state.toJS().modal

  return {
    modalType, modalProps
  }
}

export default connect(mapStateToProps)(ModalConductor);
