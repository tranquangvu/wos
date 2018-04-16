import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrderItemsCount } from '../../utils/cart';

import { Link } from 'react-router-dom';
import { Layout, Icon, Badge } from 'antd';
import shoppingCartIcon from '../../assets/icons/shopping-cart.svg';

const { Header } = Layout;

class MainHeader extends Component {
  render() {
    const { orderItemsCount, onToggleSiderIconClick } = this.props;

    return (
      <Header className='main-header-container'>
        {/* TOOGLE SILDER */}
        <a
          className='header-toggle-sidebar'
          onClick={onToggleSiderIconClick}
        >
          <Icon type='bars' />
        </a>

        {/* HEADER TITLE */}
        <div className='header-title'>
          GO WOS
        </div>

        {/* CART INFORMATION */}
        <Link to='/cart' className='header-basket-info'>
          <Badge count={orderItemsCount}>
            <img src={shoppingCartIcon} className='basket-icon' alt='header-basket-icon' />
          </Badge>
        </Link>
      </Header>
    );
  }
}

MainHeader.propTypes = {
  orderItemsCount: PropTypes.number.isRequired,
  onToggleSiderIconClick: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { orderItems } = state.toJS().cart;
  const orderItemsCount = getOrderItemsCount(orderItems);

  return { orderItemsCount }
}

export default connect(mapStateToProps)(MainHeader);
