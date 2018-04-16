import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrderTypeAndConactInfoToCart, finishCartCheckOut, setCurrentStepToCart } from '../../actions/cart';
import * as checkOutSteps from '../../constants/checkOutSteps';

import { Form, Radio, Button, Icon, Input } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class SelectOrderType extends Component {
  state = {
    selectedDelivery: false
  }

  componentWillMount() {
    const { currentStep, history } = this.props;

    if (currentStep !== checkOutSteps.CHECK_OUT_SELECT_LOCATION_STEP) {
      history.push('/cart');
    }
  }

  componentDidMount() {
    const { currentStep, setCurrentStepToCart } = this.props;

    if (currentStep === checkOutSteps.CHECK_OUT_SELECT_LOCATION_STEP) {
      setCurrentStepToCart(checkOutSteps.CHECK_OUT_SELECT_ORDER_TYPE_STEP);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkedOut && (this.props.orderCode !== nextProps.orderCode)) {
      this.props.history.push('/order-detail');
    }
  }

  submitCart = (e) => {
    e.preventDefault();

    const { form, setOrderTypeAndConactInfoToCart, finishCartCheckOut } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { orderType, contactName, contactPhoneNumber, contactAddress } = values;

        setOrderTypeAndConactInfoToCart(orderType, {
          contactName,
          contactPhoneNumber,
          contactAddress
        });
        finishCartCheckOut();
      }
    });
  }

  handleOrderTypeChange = (e) => {
    if (e.target.value === 'delivery') {
      this.setState({ selectedDelivery: true });
    } else {
      this.setState({ selectedDelivery: false });
    }
  }

  render() {
    const { selectedDelivery } = this.state;
    const { form, phoneNumber } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className='select-order-type-container'>
        <h1 className='select-order-type-title'>
          Select the order type:
        </h1>
        <Form className='select-order-type-form' onSubmit={this.submitCart}>
          {/** ORDER TYPE */}
          <FormItem>
            {getFieldDecorator('orderType', {
              initialValue: 'take_away'
            })(
              <RadioGroup className='order-type-radio-group' size='large' onChange={this.handleOrderTypeChange}>
                <Radio value='take_away'>Take Away</Radio>
                <Radio value='delivery'>Delivery</Radio>
              </RadioGroup>
            )}
          </FormItem>

          {
            /** DELIVERY CONTACT INFORMATION */
            selectedDelivery && <div className='order-contact-info'>
              <h2 className='select-order-type-title'>
                Fill in your contact infomation:
              </h2>

              <FormItem label='Your Name'>
                {getFieldDecorator('contactName', {
                  rules: [{ required: selectedDelivery, message: 'Please input your name!' }],
                })(
                  <Input placeholder='Type Your Name' size='large' />
                )}
              </FormItem>

              <FormItem label='Your Phone'>
                {getFieldDecorator('contactPhoneNumber', {
                  rules: [{ required: selectedDelivery, message: 'Please input your phone!' }],
                  initialValue: phoneNumber
                })(
                  <Input placeholder='Type Your Phone Number' size='large'/>
                )}
              </FormItem>

              <FormItem label='Your Address'>
                {getFieldDecorator('contactAddress', {
                  rules: [{ required: selectedDelivery, message: 'Please input your adddress!' }],
                })(
                  <Input placeholder='Type Your Address' size='large' />
                )}
              </FormItem>
            </div>
          }

          {/** FINISH CHECKOUT */}
          <Button type='primary' htmlType='submit' className='submit-cart-button'>
            <span>Finish</span>
            <Icon type='arrow-right' />
          </Button>
        </Form>
      </div>
    );
  }
}

SelectOrderType.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  setOrderTypeAndConactInfoToCart: PropTypes.func.isRequired,
  finishCartCheckOut: PropTypes.func.isRequired,
  checkedOut: PropTypes.bool.isRequired,
  setCurrentStepToCart: PropTypes.func.isRequired,
  currentStep: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
}

const mapStateToProps = (state) => {
  const { cart: { checkedOut, orderCode, currentStep }, verify: { phoneNumber } } = state.toJS();

  return {
    checkedOut,
    orderCode,
    currentStep,
    phoneNumber,
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    setOrderTypeAndConactInfoToCart,
    finishCartCheckOut,
    setCurrentStepToCart,
  }, dispatch);

  return {
    ...actions,
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SelectOrderType));
