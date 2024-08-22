import { User } from "../types";

export type UserActions =
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "set-user"; payload: User | null };

export type UserState = {
  users: User[];
  modal: boolean;
  user: User | null;
};

export const initialState: UserState = {
  users: [],
  modal: false,
  user: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case "show-modal":
      return { ...state, modal: true };
    case "close-modal":
      return { ...state, modal: false, user: null };
    case "set-user":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
