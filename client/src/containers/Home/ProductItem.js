import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

import { showModal } from '../../actions/modal';
import * as modalTypes from '../../constants/modalTypes';

class ProductItem extends Component {
  handleAdd = () => {
    const { id: itemId, name: itemName, price: itemPrice, priceUnit: itemPriceUnit, dispatch } = this.props;

    dispatch(showModal(modalTypes.MODIFIER_MODAL, {
      modifierModal: { itemId, itemName, itemPrice, itemPriceUnit }
    }));
  }

  render() {
    const { id, image, name, price, priceUnit, ordered, orderedCount } = this.props

    return (
      <div
        key={`product-item-${id}`}
        className='product-item-container'
      >
        <Link to={`/items/${id}`}>
          <img src={image.url} alt={`product-item-${id}`} className='product-item-cover' />
        </Link>
        <Link to={`/items/${id}`}>
          <div className='product-item-detail'>
            <div className='product-item-name'>{name}</div>
            <div className='product-item-price'>{parseInt(price, 10).toLocaleString()}</div>
          </div>
          {
            ordered &&
            <div className='product-item-ordered-count'>{orderedCount}</div>
          }
        </Link>
        <Button className='product-item-add' onClick={this.handleAdd}>
          <span>Add</span>
          <Icon type='plus' />
        </Button>
      </div>
    )
  }
}

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(ProductItem);
