export const setShowSettings = (payload) => ({
   type: 'TOGGLE_SETTINGS',
   payload
})

export default function reducer(state = false, action) {
   switch(action.type) {
      case 'TOGGLE_SETTINGS':
         return action.payload;
      default:
         return state
   }
}