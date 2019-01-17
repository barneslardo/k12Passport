import axios from "axios";
import { FETCH_USER } from "./types";
import { FETCH_VISITOR } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchVisitor = () => async dispatch => {
  const res = await axios.get("/newVisitor");

  dispatch({ type: FETCH_VISITOR, payload: res.data });
};
