import {actionTypesFood} from "./actionTypes";
import * as apis from "../../apis";

export const getFood = () => async (dispatch) => {
  try {
    const reponse = await apis.showFoods();
    dispatch({ type: actionTypesFood.showFoods, data: reponse });
  } catch (error) {
    dispatch({ type: actionTypesFood.showFoods, data: null });
  }
};
