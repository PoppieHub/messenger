export default interface ProfileRequest {
    nickname?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
    hideEmail?: boolean | null;
}