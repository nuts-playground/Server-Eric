export class UserResponseDto {
    private readonly user_id: number;
    private readonly user_email: string;
    private readonly user_name: string;
    private readonly provider_id: string;

    constructor(
        userId: number,
        userEmail: string,
        userName: string,
        providerId: string,
    ) {
        this.user_id = userId;
        this.user_email = userEmail;
        this.user_name = userName;
        this.provider_id = providerId;
    }

    getProfileInfo() {
        return {
            name: this.user_name,
            email: this.user_email,
            provider: this.provider_id,
        };
    }
}
