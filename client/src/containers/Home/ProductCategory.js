import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import ProductItem from './ProductItem'

class ProductCategory extends Component {
  itemIsOrdered = (itemId) => {
    return this.props.orderedItems.map(orderedItem => orderedItem.id).indexOf(itemId) !== -1;
  }

  getOrderedItemQuantity = (itemId) => {
    return this.props.orderedItems.map(orderedItem => {
      if (orderedItem.id.toString() === itemId.toString()) return orderedItem.quantity;
      return 0;
    }).reduce((a, b) => a + b, 0);
  }

  render() {
    const { name, items } = this.props

    return (
      <div className='product-category-container'>
        <h2 className='product-category-title'>
          <Icon type='right-circle-o' />
          <span>{name}</span>
        </h2>
        <div className='product-category-items'>
          {
            items.map(item => (
              <ProductItem
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                priceUnit={item.priceUnit}
                ordered={this.itemIsOrdered(item.id)}
                orderedCount={this.getOrderedItemQuantity(item.id)}
                key={item.id}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

ProductCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProductCategory;
