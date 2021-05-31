import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getUserCartRef } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.types";
import CartActionTypes from "./cart.types";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import { selectCurrentUser } from "./../user/user.selectors";
import { selectCartItems } from "./cart.selectors";

export function* clearCartOnSingOut() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}
export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSingOut);
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGNIN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartInFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onCartChange),
    call(onSignInSuccess),
  ]);
}
