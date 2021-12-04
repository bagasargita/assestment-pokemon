import axios from "axios";

export const MyPokemonList = () => async (dispatch) => {
  try {
    dispatch({
      type: "DASHBOARD_LIST",
    });
    const res = await axios.get(`http://localhost:5000/myapp`);
    dispatch({
      type: "DASHBOARD_LIST_SUCCESS",
      payload: res.data,
    });
    // console.log(res);
  } catch (error) {
    dispatch({
      type: "DASHBOARD_LIST_ERROR",
    });
  }
};
export const MyGetPokemon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DASHBOARD_LIST_BYID",
    });
    const res = await axios.get(`http://localhost:5000/myapp/${id}`);
    dispatch({
      type: "DASHBOARD_LIST_SUCCESS_BYID",
      payload: res.data,
      idPokemon: id,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_LIST_ERROR_BYID",
    });
  }
};
