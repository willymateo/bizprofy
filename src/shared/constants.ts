const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;

export { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, USERNAME_REGEX, EMAIL_REGEX };
