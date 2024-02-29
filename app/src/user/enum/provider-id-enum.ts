export const ProviderIdEnumValue = {
    GOOGLE: 'google',
    GITHUB: 'github',
    KAKAO: 'kakao',
    NAVER: 'naver',
} as const;
export type ProviderIdEnum = (typeof ProviderIdEnumValue)[keyof typeof ProviderIdEnumValue];
