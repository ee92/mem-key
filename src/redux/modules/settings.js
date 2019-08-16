import { combineReducers } from "redux";

export const setSettings = (payload) => ({
   type: 'SET_SETTINGS',
   payload
})

export const setIsMemorable = (payload) => ({
   type: 'SET_IS_MEMORABLE',
   payload
})

export const setNumLetters = (payload) => ({
   type: 'SET_NUM_LETTERS',
   payload
})

export const setNumWords = (payload) => ({
   type: 'SET_NUM_WORDS',
   payload
})

export const setUseSymbols = (payload) => ({
   type: 'SET_USE_SYMBOLS',
   payload
})

export const setSymbols = (payload) => ({
   type: 'SET_SYMBOLS',
   payload
})

export const setUseSalt = (payload) => ({
   type: 'SET_USE_SALT',
   payload
})

export const setSalt = (payload) => ({
   type: 'SET_SALT',
   payload
})

function isMemorable(state = true, action) {
   switch(action.type) {
      case 'SET_IS_MEMORABLE':
         return action.payload;
      default:
         return state;
   }
};

function numLetters(state = 10, action) {
   switch(action.type) {
      case 'SET_NUM_LETTERS':
         return action.payload;
      default:
         return state;
   }
};

function numWords(state = 3, action) {
   switch(action.type) {
      case 'SET_NUM_WORDS':
         return action.payload;
      default:
         return state;
   }
};

function useSymbols(state = true, action) {
   switch(action.type) {
      case 'SET_USE_SYMBOLS':
         return action.payload;
      default:
         return state;
   }
};

function symbols(state = "@#$%^&*?!", action) {
   switch(action.type) {
      case 'SET_SYMBOLS':
         return action.payload;
      default:
         return state;
   }
};

function useSalt(state = false, action) {
   switch(action.type) {
      case 'SET_USE_SALT':
         return action.payload;
      default:
         return state;
   }
};

function salt(state = "", action) {
   switch(action.type) {
      case 'SET_SALT':
         return action.payload;
      default:
         return state;
   }
};

const settingsReducer = combineReducers({
   isMemorable,
   numLetters,
   numWords,
   useSymbols,
   symbols,
   useSalt,
   salt,
});

const reducer = (state, action) => {
   if (action.type === 'SET_SETTINGS') {
      state = action.payload
   }
   return settingsReducer(state, action);
}

export default reducer;