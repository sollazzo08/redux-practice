import axios from 'axios';
import * as actions from '../api';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      next(action);
      return;
    }
    const { url, method, data, onSuccess, onStart, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: 'http://localhost:9001/api',
        url, //bugs
        method,
        data,
      });
      //General success dispatch
      dispatch(actions.apiCallSuccess(response.data));
      //Specific success dispatch
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      //General Error action
      dispatch(actions.apiCallFailed(error.message));
      //Specific error actions
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
