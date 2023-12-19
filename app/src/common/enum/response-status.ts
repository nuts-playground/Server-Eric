const ResponseStatusValues = {
    success: 'success',
    error: 'error',
    bad_param: 'bad_param',
    exception: 'exception',
} as const;

export type ResponseStatus = (typeof ResponseStatusValues)[keyof typeof ResponseStatusValues];
