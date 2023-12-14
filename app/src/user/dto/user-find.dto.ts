export class UserFindDto {
    private readonly EMAIL: string;

    constructor(email: string) {
        this.EMAIL = email;
    }
    getEmail() {
        return this.EMAIL;
    }
}
