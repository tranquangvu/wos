import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalTypes from '../../constants/modalTypes';
import * as checkOutSteps from '../../constants/checkOutSteps';
import { showModal } from '../../actions/modal';
import { getItemTotalPrice, getModifierTotalPrice, getCartTotalPrice } from '../../utils/cart';
import { fetchItemAndModifierData, checkCouponCode, removeItemFromCart, setCurrentStepToCart } from '../../actions/cart';
import { findInData, arrayContainsOrEqualArray } from '../../utils/common';

import { Collapse, Row, Col, Button, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';

const Panel = Collapse.Panel;

class Cart extends Component {
  allOrderItemIds = () => {
    return _.uniq(this.props.orderItems.map(orderItem => orderItem.id.toString())).sort();
  }

  allOrderModifierIds = () => {
    let modifierIds = _.flattenDeep(
      this.props.orderItems.map(orderItem => _.keys(orderItem.modifiers)
      ));
    return _.uniq(modifierIds).sort();
  }

  componentWillMount() {
    const { orderItems, couponCode, coupon, fetchItemAndModifierData, checkCouponCode } = this.props;

    if (orderItems.length) {
      fetchItemAndModifierData(this.allOrderItemIds(), this.allOrderModifierIds());
    }

    if (couponCode && !coupon) {
      checkCouponCode(couponCode);
    }
  }

  componentDidMount() {
    this.props.setCurrentStepToCart(checkOutSteps.CHECK_OUT_PENDING_STEP);
  }

  renderItemHeader = (item) => {
    const { itemData, modifierData } = this.props;
    const itemdata = findInData(itemData, item.id);

    return (
      <div className='order-item-collapse-panel-header'>
        <div className='order-item-name'>
          {itemdata.name}
        </div>
        <div className='order-item-amount'>
          x{item.quantity}
        </div>
        <div className='order-item-total-price'>
          {parseInt(getItemTotalPrice(itemData, modifierData, item.id, item.quantity, item.modifiers), 10).toLocaleString()}
        </div>
      </div>
    );
  }

  renderItemModifiers = (modifiers) => {
    return (
      <ul className='item-modifiers'>
        {
          Object.keys(modifiers).map(modifierId => this.renderItemModifier({
            id: modifierId,
            quantity: modifiers[modifierId]
          }))
        }
      </ul>
    )
  }

  renderItemModifier = (modifier) => {
    const { modifierData } = this.props;
    const modifierdata = findInData(modifierData, modifier.id);

    return (
      <li className='item-modifier' key={modifier.id}>
        <span className='item-modifier-name'>
          {modifierdata.name}
        </span>
        <span className='item-modifier-amount'>
          x{modifier.quantity}
        </span>
        <span className='item-modifier-total-price'>
          {parseInt(getModifierTotalPrice(modifierData, modifier.id, modifier.quantity), 10).toLocaleString()}
        </span>
      </li>
    );
  }

  renderNoItems = () => {
    return (
      <div className='cart-container flex no-items'>
        <h1>There are no items in your cart!</h1>
        <Link to='/'>
          <Button
            size='large'
            type='dashed'
            icon='shopping-cart'
            className='start-shopping-button'
          >
            Start Ordering
          </Button>
        </Link>
      </div>
    );
  }

  renderSpiner = () => {
    return (
      <div className='cart-container flex'>
        <Spin size='large'></Spin>
      </div>
    )
  }

  showCouponModal = () => {
    this.props.showModal(modalTypes.COUPON_MODAL, { couponModal: {} });
  }

  handleCheckOut = () => {
    this.props.history.push('/select-location');
  }

  render() {
    const { orderItems, itemData, modifierData, isFetching, coupon } = this.props;
    const couponPrice = coupon ? coupon.price : 0;
    const itemDataIds = itemData.map(item => item.id.toString()).sort();
    const modifierDataIds = modifierData.map(modifier => modifier.id.toString()).sort();

    if (!orderItems.length) {
      return this.renderNoItems();
    }

    if (isFetching ||
      !arrayContainsOrEqualArray(itemDataIds, this.allOrderItemIds()) ||
        !arrayContainsOrEqualArray(modifierDataIds, this.allOrderModifierIds())) {
      return this.renderSpiner();
    }

    return (
      <div className='cart-container'>
        {/* ORDER ITEMS */}
        <Collapse
          bordered={false}
          defaultActiveKey={[...Array(orderItems.length).keys()].toString().split(',')}
        >
          {
            orderItems.map((orderItem, index) => (
              <Panel
                header={this.renderItemHeader(orderItem)}
                key={index}
              >
                {this.renderItemModifiers(orderItem.modifiers)}
                <Button
                  size='small'
                  className='remove-item-button'
                  onClick={() => this.props.removeItemFromCart(orderItem)}
                >
                  Remove
                </Button>
              </Panel>
            ))
          }
        </Collapse>

        {
          /* COUPON CODE REQUEST */
          !coupon && <Button
            icon='wallet'
            onClick={this.showCouponModal}
            className='use-coupon-button'
          >
            Use coupon code
          </Button>
        }
        {
          /* COUPON CODE DISCOUNT PRICE*/
          coupon && <Row
            type='flex'
            align='middle'
            justify='space-around'
            className='cart-coupon-price'
          >
            <Col span={12}>
              <span className='coupon-title'>
                Discount
              </span>
            </Col>
            <Col span={12}>
              <span className='coupon-price'>
                {parseInt(coupon.price, 10).toLocaleString()}
              </span>
            </Col>
          </Row>
        }

        {/* TOTAL PRICE */}
        <Row
          type='flex'
          align='middle'
          justify='space-around'
          className='cart-total-price'
        >
          <Col span={12}>
            <h2>Total Cost</h2>
          </Col>
          <Col span={12}>
            <span className='total-price'>
              {parseInt(getCartTotalPrice(itemData, modifierData, orderItems, couponPrice), 10).toLocaleString()}
            </span>
          </Col>
        </Row>

        {/* CHECKOUT */}
        <Button onClick={this.handleCheckOut} className='check-out-button'>
          <span>Check Out</span>
          <Icon type='arrow-right' />
        </Button>
      </div>
    )
  }
}

Cart.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orderItems: PropTypes.array.isRequired,
  itemData: PropTypes.array.isRequired,
  modifierData: PropTypes.array.isRequired,
  fetchItemAndModifierData: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setCurrentStepToCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { orderItems, itemData, modifierData, isFetching, couponCode, coupon } = state.toJS().cart;

  return {
    orderItems,
    itemData,
    modifierData,
    isFetching,
    couponCode,
    coupon,
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    fetchItemAndModifierData,
    showModal,
    checkCouponCode,
    removeItemFromCart,
    setCurrentStepToCart,
  }, dispatch);

  return {
    ...actions,
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
