import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
      process.env.NODE_ENV !== 'production' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f,
    ),
  );
};

export default configureStore;
