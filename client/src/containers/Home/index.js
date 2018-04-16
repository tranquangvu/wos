import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchMenu } from '../../actions/menu';

import { Spin, Alert } from 'antd';
import ProductCategory from './ProductCategory';

class Home extends Component {
  componentWillMount() {
    this.props.fetchMenu();
  }

  render() {
    const { menu, error, isFetching, orderedItems } = this.props;

    return (
      <div className='home-container'>
        {
          !isFetching && !error && menu.map((category, index) => (
            <ProductCategory
              id={category.id}
              name={category.name}
              items={category.items}
              orderedItems={orderedItems}
              key={category.id}
            />
          ))
        }
        {
          !isFetching && error &&
          <Alert
            message='Something went wrong. Please try again!'
            description={`${error}`}
            type='error'
            showIcon
          />
        }
        {
          isFetching && <Spin size='large'></Spin>
        }
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  menu: PropTypes.array.isRequired,
  fetchMenu: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { menu: { menu, error, isFetching }, cart: { orderItems: orderedItems } } = state.toJS();

  return {
    menu,
    error,
    isFetching,
    orderedItems,
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    fetchMenu
  }, dispatch);

  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
