export const setSiteList = (payload) => ({
   type: 'SET_SITE_LIST',
   payload
})

export default function siteListReducer(state = [], action) {
   switch(action.type) {
      case 'SET_SITE_LIST':
         return action.payload;
      default:
         return state
   }
}