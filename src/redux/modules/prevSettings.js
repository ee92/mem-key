export const setPrevSettings = (payload) => ({
   type: 'SET_PREV_SETTINGS',
   payload
});

export default function reducer(state = null, action) {
   switch(action.type) {
      case 'SET_PREV_SETTINGS':
         return action.payload;
      default:
         return state;
   }
};