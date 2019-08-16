import { createKey } from '../../api/generate';
import { addItem, updateItem } from '../../api/database';

export const setPassword = (payload) => ({
   type: 'SET_PASSWORD',
   payload
});

export const generatePassword = () => ({
   type: 'GENERATE_PASSWORD'
});

export default function reducer(state = "", action) {
   switch(action.type) {
      case 'SET_PASSWORD':
         return action.payload;
      default:
         return state;
   }
};

export const passwordGenerator = ({dispatch, getState}) => next => action => {
   next(action);
   if (action.type === 'GENERATE_PASSWORD') {
      const {inputs, settings, siteList, user} = getState();
      const {site, email, secret} = inputs;
      const createPassword = () => {
         if (!site || !email|| !secret) return;
         const password = createKey(site, email, secret, settings);
         dispatch(setPassword(password));
      };
      const recordSettings = () => {
         if (!user) return;
         const existingSite = siteList.find((item) => {
            return item.site.toLowerCase() === site.toLowerCase();
         });
         if (existingSite) {
            updateItem(user.uid, existingSite.id, {site, email, settings});
         } else {
            addItem(user.uid, {site, email, settings});
         }
      };
      createPassword();
      recordSettings();
   }
};