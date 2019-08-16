export const setVisualHint = (payload) => ({
   type: 'SET_VISUAL_HINT',
   payload
})

export default function reducer(state = [], action) {
   switch(action.type) {
      case 'SET_VISUAL_HINT':
         return action.payload;
      default:
         return state
   }
}