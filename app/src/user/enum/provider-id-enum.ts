export const ProviderIdEnumValue = {
    google: 'google',
    github: 'github',
    kakao: 'kakao',
    naver: 'naver',
} as const;
export type ProviderIdEnum = (typeof ProviderIdEnumValue)[keyof typeof ProviderIdEnumValue];
