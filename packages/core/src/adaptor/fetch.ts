export const fetch = typeof window === "undefined" ? () => {} : window?.fetch;
