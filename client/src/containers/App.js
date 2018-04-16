import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import createRoutes from '../routes';

import '../styles/application.scss';

const routes = createRoutes();

const App = ({ store }) => (
  <Provider store={store}>
    {routes}
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App;
