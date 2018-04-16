import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { setVerifyAndCurrentCartData, requestCurrentCart } from '../../actions/verify';

import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import MainSider from './MainSider';
import ModalConductor from '../Modals/ModalConductor';

class MainLayout extends Component {
  toggleSider = () => {
    this.sider.toggle();
  }

  render() {
    const {
      component: Component,
      phoneNumber,
      currentCart,
      ...rest
    } = this.props;

    const ignoreVerifyPaths = ['/order-detail'];

    return (
      <Route {...rest} render={props => {
        const url = new URL(window.location);
        const phoneNumberParam = url.searchParams.get('phone_number');
        const orderTypeParam = url.searchParams.get('order_type');
        const classifierParam = url.searchParams.get('classifier');
        const clientIdParam = url.searchParams.get('client_id');
        const userIdParam = url.searchParams.get('user_id');

        if (ignoreVerifyPaths.indexOf(props.match.path) === -1 &&
          !(phoneNumberParam && orderTypeParam && classifierParam && clientIdParam && userIdParam) && !phoneNumber) {
          return (
            <Redirect to={{
              pathname: '/phone-verify',
              state: { from: props.location }
            }}/>
          );
        }

        if (ignoreVerifyPaths.indexOf(props.match.path) === -1 &&
          phoneNumberParam && orderTypeParam && classifierParam && clientIdParam && userIdParam) {
          this.props.setVerifyAndCurrentCartData({
            phoneNumber: phoneNumberParam,
            orderType: orderTypeParam,
            classifier: classifierParam,
            clientId: clientIdParam,
            userId: userIdParam,
          });
        }

        if (ignoreVerifyPaths.indexOf(props.match.path) === -1 &&
          !(phoneNumberParam && orderTypeParam && classifierParam && clientIdParam && userIdParam) &&
            phoneNumber && !currentCart) {
          this.props.requestCurrentCart({phoneNumber: phoneNumber});
        }

        return (
          <Layout>
            <MainSider wrappedComponentRef={(sider) => this.sider = sider} />
            <Layout>
              <MainHeader onToggleSiderIconClick={this.toggleSider} />
              <Component {...props} />
              <MainFooter />
            </Layout>
            <ModalConductor/>
          </Layout>
        );
      }} />
    );
  }
}

const mapStateToProps = (state) => {
  const { phoneNumber, currentCart } = state.toJS().verify;

  return {
    phoneNumber,
    currentCart,
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    setVerifyAndCurrentCartData,
    requestCurrentCart,
  }, dispatch)

  return  {
    ...actions,
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
