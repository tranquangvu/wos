import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLayout from '../containers/Layouts/MainLayout';
import Home from '../containers/Home';
import Item from '../containers/Item';
import Cart from '../containers/Cart';
import SelectLocation from '../containers/Cart/SelectLocation';
import SelectOrderType from '../containers/Cart/SelectOrderType';
import Promotions from '../containers/Promotions';
import OrderDetail from '../containers/OrderDetail';
import PhoneVerify from '../containers/PhoneVerify';
import CodeVerify from '../containers/CodeVerify';

const createRoutes = () => {
  return (
    <Router>
      <Switch>
        <MainLayout exact path='/' component={Home}/>
        <MainLayout path='/items/:id' component={Item} />
        <MainLayout path='/cart' component={Cart} />
        <MainLayout path='/select-location' component={SelectLocation}/>
        <MainLayout path='/select-order-type' component={SelectOrderType} />
        <MainLayout path='/order-detail' component={OrderDetail} />
        <MainLayout path='/promotions' component={Promotions} />
        <Route path='/phone-verify' component={PhoneVerify}></Route>
        <Route path='/code-verify' component={CodeVerify}></Route>
      </Switch>
    </Router>
  );
};

export default createRoutes;
