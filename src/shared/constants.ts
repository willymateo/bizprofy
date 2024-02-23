const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;
const APP_ROOT_ID = "root";

const LANGUAGE_CODES = {
  ENGLISH: "en",
  SPANISH: "es",
};

const LANGUAGES_DATA = {
  [LANGUAGE_CODES.ENGLISH]: {
    imgUrl: "/images/gb.svg",
    label: "English",
    value: "en",
  },
  [LANGUAGE_CODES.SPANISH]: {
    imgUrl: "/images/es.svg",
    label: "Spanish",
    value: "es",
  },
};

export {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
  LANGUAGE_CODES,
  LANGUAGES_DATA,
  EMAIL_REGEX,
  APP_ROOT_ID,
};
