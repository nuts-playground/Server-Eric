export class UserResponseDto {
    private readonly user_email: string;
    private readonly user_name: string;
    private readonly provider_id: string;

    constructor(
        userEmail: string,
        userName: string,
        providerId: string,
    ) {
        this.user_email = userEmail;
        this.user_name = userName;
        this.provider_id = providerId;
    }

    getProfileInfo() {
        return {
            name: this.user_name,
            provider: this.provider_id,
        };
    }
}
