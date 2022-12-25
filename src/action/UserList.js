import axios from "axios";
import { USER_LIST_FAIL, USER_LIST_SUCCESS } from "../constant/Constant";

export const UserList = () => {
  return async (dispatch) => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")

      .then((res) => {
        dispatch({
          type: USER_LIST_SUCCESS,
          data: res,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_LIST_FAIL,
          error: error,
        });
      });
  };
};
