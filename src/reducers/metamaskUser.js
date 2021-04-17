import { SET_PK, SET_ADDRESS } from "../actions/metamaskUser";

export default function metamaskUser(state = null, action) {
  switch (action.type) {
    case SET_PK:
      return {
      	...state,
      	['pk']:action.pk
      };

    case SET_ADDRESS:
       return {
       	...state,
       	['address']:action.address
       };

    default:
      return state;
  }
}
