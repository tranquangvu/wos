import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItem } from '../../actions/item';
import { addToCart } from '../../actions/cart';
import { Row, Col, Icon, InputNumber, Button, Spin } from 'antd';

class Item extends Component {
  state = {
    modifiersQuantity: {},
    itemQuantity: 1,
  }

  componentWillMount() {
    const { fetchItem, match: { params } } = this.props;
    fetchItem(params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.keys(this.state.modifiersQuantity).length) {
      let modifiersQuantity = {};
      nextProps.modifiers.forEach(modifier => {
        modifiersQuantity[modifier.id] = this.state.modifiersQuantity[modifier.id] || 0
      });
      this.setState({ modifiersQuantity });
    }
  }

  handleModifierQuantityChange = (modifierId, quantity) => {
    let { modifiersQuantity } = this.state;
    modifiersQuantity[modifierId] = quantity;
    this.setState({ modifiersQuantity });
  }

  decreaseModifierQuantity = (modifierId, min, step = 1) => {
    let { modifiersQuantity } = this.state;
    if (modifiersQuantity[modifierId] > min) modifiersQuantity[modifierId] -= step;
    this.setState({ modifiersQuantity });
  }

  increaseModifierQuantity = (modifierId, max, step = 1) => {
    let { modifiersQuantity } = this.state;
    if (modifiersQuantity[modifierId] < max) modifiersQuantity[modifierId] += step;
    this.setState({ modifiersQuantity });
  }

  handleItemQuantityChange = (itemQuantity) => {
    this.setState({ itemQuantity });
  }

  decreaseItemQuantity = (min, step = 1) => {
    let { itemQuantity } = this.state;
    if (itemQuantity > min) itemQuantity -= step;
    this.setState({ itemQuantity })
  }

  increaseItemQuantity = (max, step = 1) => {
    let { itemQuantity } = this.state;
    if (itemQuantity < max) itemQuantity += step;
    this.setState({ itemQuantity })
  }

  handleAddToCart = () => {
    const { modifiersQuantity, itemQuantity } = this.state;
    const { item, addToCart } = this.props;

    let modifiers = {}
    Object.keys(modifiersQuantity).forEach(key => {
      if (modifiersQuantity[key] > 0) modifiers[key] = modifiersQuantity[key];
    });

    addToCart({ id: item.id, quantity: itemQuantity, modifiers});
    this.props.history.push('/');
  }

  getTotalPrice = () => {
    const { itemQuantity, modifiersQuantity } = this.state;
    const { modifiers, item } = this.props;

    let totalPrice = itemQuantity * item.price;
    modifiers.forEach(modifier => {
      totalPrice += modifier.price * modifiersQuantity[modifier.id];
    });
    return totalPrice;
  }

  renderModifier = (modifier) => {
    const { modifiersQuantity } = this.state;

    return (
      <Row
        key={modifier.id}
        type='flex'
        align='middle'
        justify='space-around'
        className='item-modifier'
      >
        <Col span={10} className='item-modifier-name'>{modifier.name}</Col>
        <Col span={4}>{parseInt(modifier.price, 10).toLocaleString()}</Col>
        <Col span={10}>
          <div className='input-number-container'>
            <Button
              className='input-number-decrease-button'
              onClick={() => this.decreaseModifierQuantity(modifier.id, modifier.lowerLimit || 0)}
            >
              <Icon type='minus' />
            </Button>
            <InputNumber
              size='large'
              min={modifier.lowerLimit || 0}
              max={modifier.upperLimit || Infinity}
              value={modifiersQuantity[modifier.id]}
              defaultValue={modifiersQuantity[modifier.id]}
              onChange={(value) => this.handleModifierQuantityChange(modifier.id, value)}
              className='input-number'
            />
            <Button
              className='input-number-increase-button'
              onClick={() => this.increaseModifierQuantity(modifier.id, modifier.upperLimit || Infinity)}
            >
              <Icon type='plus' />
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  renderModifierGroup = (modifierGroup) => {
    return (
      <div className='item-modifier-group' key={modifierGroup.id}>
        <div className='item-modifier-group-name'>
          <Icon type="right-circle-o" />
          <span>{modifierGroup.name}</span>
        </div>
        <div className='item-modifiers'>
          {modifierGroup.modifiers.map(modifier => this.renderModifier(modifier))}
        </div>
      </div>
    );
  }

  render() {
    const { itemQuantity } = this.state;
    const { item, error, isFetching } = this.props;

    return (
      <div className='item-container'>
        {
          !isFetching && !error && item &&
          <Row>
            <Col span={24}>
              {/* ITEM COVER IMAGE */}
              <img src={item.image.url} alt={`item-${item.id}-cover`} className='item-detail-cover'/>

              {/* ITEM DETAIL */}
              <div className='item-detail'>
                <h1 className='item-name'>{item.name}</h1>
                <h2 className='item-price'>Price: {parseInt(item.price, 10).toLocaleString()}</h2>
                <p className='item-description'>{item.description}</p>

                {
                  /* REDNER MODIFIERS AND GROUPS */
                  item.modifierGroups.length > 0 &&
                  <div className='item-modifier-groups-container'>
                    <h2>
                      {`Select modifiers for ${item.name}`}
                    </h2>
                    {item.modifierGroups.map(modifierGroup => this.renderModifierGroup(modifierGroup))}
                  </div>
                }

                <div className='item-order-container'>
                  {/* ITEM ORDER QUANTITY */}
                  <Row
                    type="flex"
                    align="middle"
                    justify="space-around"
                    className='item-order-count'
                  >
                    <Col span={14}><h2>Number Of Orders</h2></Col>
                    <Col span={10}>
                      <div className='input-number-container'>
                        <Button
                          onClick={() => this.decreaseItemQuantity(1)}
                          className='input-number-decrease-button'
                        >
                          <Icon type='minus' />
                        </Button>
                        <InputNumber
                          size='large'
                          min={1}
                          value={itemQuantity}
                          defaultValue={itemQuantity}
                          onChange={this.handleItemQuantityChange}
                          className='input-number'
                        />
                        <Button
                          onClick={() => this.increaseItemQuantity(Infinity)}
                          className='input-number-increase-button'
                        >
                          <Icon type='plus' />
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  {/* ITEM ORDER TOTAL PRICE */}
                  <Row
                    type='flex'
                    align='middle'
                    justify='space-around'
                    className='item-order-total-price'
                  >
                    <Col span={12}><h2>Total Price</h2></Col>
                    <Col span={12}>
                      <span className='total-price'>
                        {parseInt(this.getTotalPrice(), 10).toLocaleString()}
                      </span>
                    </Col>
                  </Row>

                  {/* ITEM ORDER SUBMIT */}
                  <Row
                    type='flex'
                    align='middle'
                    justify='space-around'
                    className='item-order-submit'
                  >
                    <Col span={24}>
                      <Button
                        className='add-to-basket-button'
                        onClick={this.handleAddToCart}
                      >
                        <span>Add To Basket</span>
                        <Icon type='arrow-right' />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        }
        {
          isFetching &&
          <Spin size='large'></Spin>
        }
      </div>
    );
  }
}

Item.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  fetchItem: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { item, error, isFetching, modifiers } = state.toJS().item;

  return {
    item,
    error,
    isFetching,
    modifiers,
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    fetchItem,
    addToCart,
  }, dispatch);

  return {
    ...actions,
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
