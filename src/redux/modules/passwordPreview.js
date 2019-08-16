import { createKey } from '../../api/generate';

const settingsActionTypes = [
   'SET_IS_MEMORABLE',
   'SET_NUM_WORDS',
   'SET_NUM_LETTERS',
   'SET_USE_SYMBOLS',
   'SET_SYMBOLS',
   'SET_USE_SALT',
   'SET_SALT'
];

export const setPasswordPreview = (payload) => ({
   type: 'SET_PASSWORD_PREVIEW',
   payload
});

export default function reducer(state = "", action) {
   switch(action.type) {
      case 'SET_PASSWORD_PREVIEW':
         return action.payload;
      default:
         return state;
   }
};

export const passwordPreviewGenerator = (store) => next => action => {
   next(action);
   const settingChanged = settingsActionTypes.includes(action.type);
   const settingsOpened = action.type === 'TOGGLE_SETTINGS' && action.payload;
   if (settingChanged || settingsOpened) {
      const {inputs, settings} = store.getState();
      const {site, email, secret} = inputs;
      if (!site || !email|| !secret) return;
      const password = createKey(site, email, secret, settings);
      store.dispatch(setPasswordPreview(password));
   }
};