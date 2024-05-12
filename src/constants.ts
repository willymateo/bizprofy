const APP_ROOT_ID = "root";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

const NUM_DECIMALS = 2;

const MIN_CHARACTERS_TO_SEARCH = 2;

const LANGUAGE_CODES = {
  ENGLISH: "en",
  SPANISH: "es",
};

const LANGUAGES_DATA = {
  [LANGUAGE_CODES.ENGLISH]: {
    value: LANGUAGE_CODES.ENGLISH,
    imgUrl: "/images/gb.svg",
    label: "English",
  },
  [LANGUAGE_CODES.SPANISH]: {
    value: LANGUAGE_CODES.SPANISH,
    imgUrl: "/images/es.svg",
    label: "Spanish",
  },
};

const ENTITIES = {
  WAREHOUSES: "warehouses",
  CUSTOMERS: "customers",
  PROVIDERS: "providers",
  PRODUCTS: "products",
  USERS: "users",
  STOCK: "stock",
};

const ENTITY_PERMISSIONS = {
  [ENTITIES.WAREHOUSES]: {
    CREATE_WAREHOUSE: "createWarehouse",
    UPDATE_WAREHOUSE: "updateWarehouse",
    ACTIVATE_WAREHOUSE: "activateWarehouse",
    DEACTIVATE_WAREHOUSE: "deactivateWarehouse",
  },
  [ENTITIES.CUSTOMERS]: {
    CREATE_CUSTOMER: "createCustomer",
    UPDATE_CUSTOMER: "updateCustomer",
    ACTIVATE_CUSTOMER: "activateCustomer",
    DEACTIVATE_CUSTOMER: "deactivateCustomer",
  },
  [ENTITIES.PROVIDERS]: {
    CREATE_PROVIDER: "createProvider",
    UPDATE_PROVIDER: "updateProvider",
    ACTIVATE_PROVIDER: "activateProvider",
    DEACTIVATE_PROVIDER: "deactivateProvider",
  },
  [ENTITIES.PRODUCTS]: {
    CREATE_PRODUCT: "createProduct",
    UPDATE_PRODUCT: "updateProduct",
    ACTIVATE_PRODUCT: "activateProduct",
    DEACTIVATE_PRODUCT: "deactivateProduct",
    CREATE_PRODUCT_CATEGORY: "createProductCategory",
    UPDATE_PRODUCT_CATEGORY: "updateProductCategory",
    ACTIVATE_PRODUCT_CATEGORY: "activateProductCategory",
    DEACTIVATE_PRODUCT_CATEGORY: "deactivateProductCategory",
  },
  [ENTITIES.USERS]: {
    CREATE_USER: "createUser",
    UPDATE_USER: "updateUser",
    ACTIVATE_USER: "activateUser",
    DEACTIVATE_USER: "deactivateUser",
  },
  [ENTITIES.STOCK]: {
    CREATE_STOCK_IN: "createStockIn",
    CREATE_STOCK_OUT: "createStockOut",
    CREATE_CURRENT_STOCK: "createCurrentStock",
  },
};

export {
  MIN_CHARACTERS_TO_SEARCH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  ENTITY_PERMISSIONS,
  USERNAME_REGEX,
  LANGUAGE_CODES,
  LANGUAGES_DATA,
  NUM_DECIMALS,
  EMAIL_REGEX,
  APP_ROOT_ID,
  ENTITIES,
};
