import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchShop } from '../../actions/shop';
import { setShopToCart, setCurrentStepToCart } from '../../actions/cart';
import * as checkOutSteps from '../../constants/checkOutSteps';

import { Form, Radio, Button, Icon } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class SelectLocation extends Component {
  componentWillMount() {
    const { currentStep, fetchShop, history } = this.props;

    if (currentStep === checkOutSteps.CHECK_OUT_PENDING_STEP) {
      fetchShop();
    } else {
      history.push('/cart');
    }
  }

  componentDidMount() {
    const { currentStep, setCurrentStepToCart } = this.props;

    if (currentStep === checkOutSteps.CHECK_OUT_PENDING_STEP) {
      setCurrentStepToCart(checkOutSteps.CHECK_OUT_SELECT_LOCATION_STEP);
    }
  }

  submitLocation = (e) => {
    e.preventDefault();

    const { form, setShopToCart } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        setShopToCart(values.shopId);
        form.resetFields();
        this.props.history.push('/select-order-type');
      }
    });
  }

  renderShopRadio = (shop) => {
    return (
      <Radio value={shop.id} key={shop.id}>
        <span className='radio-content'>
          <span className='name'>{shop.name}</span>
          <span className='address'>{shop.address}</span>
        </span>
      </Radio>
    );
  }

  render() {
    const { form, shops } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className='select-location-container'>
        <h1 className='select-location-title'>
          Select the restaurant you want to order:
        </h1>
        <Form className='select-location-form' onSubmit={this.submitLocation}>
          <FormItem>
            {getFieldDecorator('shopId')(
              <RadioGroup className='location-radio-group'>
                {shops.map(shop => this.renderShopRadio(shop))}
              </RadioGroup>
            )}
          </FormItem>
          <Button type='primary' htmlType='submit' className='submit-location-button'>
            <span>Next</span>
            <Icon type='arrow-right' />
          </Button>
        </Form>
      </div>
    );
  }
}

SelectLocation.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchShop: PropTypes.func.isRequired,
  shops: PropTypes.arrayOf(PropTypes.object),
  setCurrentStepToCart: PropTypes.func.isRequired,
  currentStep: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  const { shop: { shops }, cart: { currentStep } } = state.toJS();

  return {
    shops,
    currentStep
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    fetchShop,
    setShopToCart,
    setCurrentStepToCart,
  }, dispatch);

  return {
    ...actions,
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SelectLocation));
