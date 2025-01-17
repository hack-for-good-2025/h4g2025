import { useContext } from "react";
import { UsersContext } from "../UsersContext";

export function useUsers() {
    const context = useContext(UsersContext);
    if (context === undefined)
        throw new Error("UsersContext was used outside UsersProvider");
    return context;
}