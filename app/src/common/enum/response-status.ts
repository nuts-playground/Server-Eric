const ResponseStatusValues = {
    SUCCESS: 'success',
    ERROR: 'error',
    BAD_PARAM: 'bad_param',
    EXCEPTION: 'exception',
} as const;

export type ResponseStatus = (typeof ResponseStatusValues)[keyof typeof ResponseStatusValues];
