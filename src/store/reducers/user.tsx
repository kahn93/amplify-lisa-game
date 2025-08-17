// User reducer to manage user-related state

interface UserState {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
};

const user = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
};

export default user;