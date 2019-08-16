export const login = (payload) => ({
   type: 'LOGIN',
   payload
})

export const logout = () => ({
   type: 'LOGOUT'
})

export default function userReducer(state = null, action) {
   switch(action.type) {
      case 'LOGIN':
         return action.payload;
      case 'LOGOUT':
         state = undefined;
         return null;
      default:
         return state
   }
}