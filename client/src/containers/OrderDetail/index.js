import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

class OrderDetail extends Component {
  render() {
    const url = new URL(window.location);
    const orderCode = url.searchParams.get('order_code') || this.props.orderCode;

    if (!orderCode) {
      return (
        <div className='order-detail-container no-completed-order'>
          <h1>There are no completed order!</h1>
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

    return(
      <div className='order-detail-container'>
        <h1 className='order-detail-title'>
          <Icon type="check-circle-o" />
          <span>Your order is ready!</span>
        </h1>

        <div className='order-detail-code'>
          <h2>Your order code</h2>
          <p className='code'>
            {orderCode}
          </p>
          <p className='note'>
            Please make a capture to save this order code
          </p>
        </div>

        <div className='order-detail-qrcode'>
          <QRCode value={orderCode} />
        </div>

        <div className='order-detail-barcode'>
          <Barcode value={orderCode} />
        </div>
      </div>
    );
  }
}

OrderDetail.propTypes = {
  orderCode: PropTypes.string
}

const mapStateToProps= (state) => {
  const { orderCode } = state.toJS().cart;

  return {
    orderCode
  }
}

export default connect(mapStateToProps)(OrderDetail);
