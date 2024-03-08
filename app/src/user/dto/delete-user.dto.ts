export class DeleteUserDto {
    private readonly user_email: string;

    constructor(userEmail: string) {
        this.user_email = userEmail;
    }

    private isEmail(): boolean {
        const regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(this.user_email);
    }

    getEmail(): string {
        return this.isEmail() ? this.user_email : null;
    }
}
