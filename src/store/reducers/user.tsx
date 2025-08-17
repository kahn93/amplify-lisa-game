// User reducer to manage user-related state

interface UserState {
  name: string;
  email: string;
}

interface UserAction {
  type: string;
  payload?: Partial<UserState>;
}

const initialState: UserState = {
  name: '',
  email: '',
};

const user = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default user;