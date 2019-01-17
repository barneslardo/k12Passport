import { FETCH_VISITOR } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_VISITOR:
      return action.payload || false;
    default:
      return state;
  }
}
