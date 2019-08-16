import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import user from './modules/user';
import siteList from './modules/siteList';
import inputs from './modules/inputs';
import password, {passwordGenerator} from './modules/password';
import passwordPreview, {passwordPreviewGenerator} from './modules/passwordPreview';
import settings from './modules/settings';
import prevSettings from './modules/prevSettings';
import showSettings from './modules/showSettings';
import visualHint from './modules/visualHint';

const appReducer = combineReducers({
  user,
  siteList,
  inputs,
  password,
  passwordPreview,
  settings,
  prevSettings,
  showSettings,
  visualHint
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      passwordGenerator,
      passwordPreviewGenerator
    )
  )
);