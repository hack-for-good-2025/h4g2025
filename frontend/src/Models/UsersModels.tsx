export interface User {
    displayName: string;
    email: string;
}

export type State = {
    users: User[];
    isLoading: boolean;
}

export type Action = 
    | { type: "getUsers"; payload: User[] }
    | { type: "toggleLoading" }

export type UsersContextType = State & {
    getUsers: () => Promise<void>;
    toggleLoading: () => void;
}