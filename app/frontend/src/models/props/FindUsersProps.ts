import {UsersListResponse} from "../response/UsersListResponse";

export interface FindUsersProps {
    users: UsersListResponse;
    onSearch?: (data: string) => void;
    inputValue?: string;
}