import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalTypes from '../../constants/modalTypes';
import { hideModal, checkCouponModalCode } from '../../actions/modal';

import { Modal, Input, Button, Form, Icon, Alert } from 'antd';

const FormItem = Form.Item;

class CouponModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { form, checkCouponModalCode } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        checkCouponModalCode(values.code);
        form.resetFields();
      }
    });
  }

  cancelModal = () => {
    this.props.hideModal(modalTypes.COUPON_MODAL);
  }

  render() {
    const { visible, error, form: { getFieldDecorator } } = this.props;

    return (
      <Modal
        visible={visible}
        footer={null}
        onCancel={this.cancelModal}
        title='Enter Your Coupon Code'
        className='coupon-modal-container'
        wrapClassName='vertical-center-modal'
      >
        {
          !!error &&
          <Alert
            message={error}
            type='error'
            showIcon
            style={{marginBottom: '5px'}}
          />
        }
        <Form onSubmit={this.handleSubmit} className='coupon-form'>
          <FormItem>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please input your coupon code!' }],
            })(
              <Input
                size='large'
                prefix={<Icon type='wallet' style={{ fontSize: 13 }} />}
                placeholder='Coupon Code'
              />
            )}
          </FormItem>
          <Button type='primary' htmlType='submit' className='submit-coupon-button' size='large'>
            <span>Submit</span>
            <Icon type='arrow-right' />
          </Button>
        </Form>
      </Modal>
    );
  }
}

CouponModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  error: PropTypes.string,
}

const mapStateToProps = (state)  => {
  const { visible, modalProps: { couponModal } } = state.toJS().modal;

  return {
    visible,
    ...couponModal,
  }
}

const mapDistpatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    hideModal,
    checkCouponModalCode,
  }, dispatch)

  return {
    ...actions,
    dispatch,
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Form.create()(CouponModal));
