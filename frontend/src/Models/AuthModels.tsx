export type User = {
  uid?: number;
  email: string;
  username?: string;
  password?: string;
};
export type State = {
  user: User | null;
  isAuthenticated: true | false;
  isLoginLoading: true | false;
};
export type Action =
  | {
      type: "login";
      payload: User;
    }
  | {
      type: "logout";
    }
  | {
      type: "toggleLoading";
    };

export type ChildrenProps = {
  children: React.ReactNode;
};

export type AuthContextType = State & {
  login: (user: User) => Promise<void>;
  logout: () => void;
  createUser: (user: User) => Promise<void>;
  loadingToggle: () => void;
};
