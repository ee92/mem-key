import { combineReducers } from "redux";

export const setSite = (payload) => ({
   type: 'SET_SITE',
   payload
})

export const setEmail = (payload) => ({
   type: 'SET_EMAIL',
   payload
})

export const setSecret = (payload) => ({
   type: 'SET_SECRET',
   payload
})

function site(state = "", action) {
   switch(action.type) {
      case 'SET_SITE':
         return action.payload;
      default:
         return state;
   }
};

function email(state = "", action) {
   switch(action.type) {
      case 'SET_EMAIL':
         return action.payload;
      default:
         return state;
   }
};

function secret(state = "", action) {
   switch(action.type) {
      case 'SET_SECRET':
         return action.payload;
      default:
         return state;
   }
};

const inputReducer = combineReducers({
   site,
   email,
   secret,
});

export default inputReducer;