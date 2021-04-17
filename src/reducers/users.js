import { RECEIVE_USERS } from "../actions/users";

//creating the user reducer
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    // case RECEIVE_ACCOUNT:
    // 	return{
    // 		...state,
    // 		...action.account
    // 	}
    default:
      return state;
  }
}
