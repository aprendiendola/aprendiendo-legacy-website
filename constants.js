/* eslint-disable max-len */
export const CONTACT_NUMBER = "972255269";
export const YAPE_CONTACT_NUMBER = "977136971";
export const WHATSAPP_URL_WEB_CONTACT =
  "https://web.whatsapp.com/send?phone=51920027709";
export const WHATSAPP_URL_MOBILE_CONTACT =
  "https://api.whatsapp.com/send?phone=51920027709";
export const DEFAULT_BRANDS_LIMIT = 6;
export const ICONS = {
  hand: "./static/images/hand-w-money.svg",
  hat: "./static/images/hat.svg",
  mountain: "./static/images/mountain.svg",
  more: "./static/images/more.svg",
  paper: "./static/images/paper.svg",
  camera: "./static/images/camera.svg",
  handShake: "./static/images/hand-shake.svg"
};
export const IMAGES = {
  main: {
    background: "./assets/images/flying-guy-background.svg",
    desktop: "./assets/images/flying-guy-desktop.svg",
    flyingGuySpring: "./assets/images/flying-guy-spring.svg",
    flyingGuyWinter: "./assets/images/flying-guy-winter.svg",
    rightSideShape: "./assets/images/shape1.svg"
  }
};
export const USER_EXPIRATION_DAYS = 14;
export const WIDTH_SIZES = {
  xs: 320,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1920
};
export const ERROR_MESSAGES = {
  default: "Ocurrió un error inesperado",
  default_payment_error: `Intenta con otra tarjeta y si aún no funciona comúnicate al ${CONTACT_NUMBER}`,
  do_not_honor:
    "Tu tarjeta ha sido negada por el banco emisor. Intenta con otra tarjeta y si aún no funciona comúnicate con tu banco",
  insufficient_funds:
    "Tu pago ha sido rechazado por falta de fondos. Asegúrate de tener fondos o intenta con otra tarjeta",
  card_not_supported:
    "Actualmente no aceptamos tu marca de tarjeta. Por favor prueba con Visa o Mastercard.",
  user_already_subscribed:
    "No podemos suscribirte porque ya tienes una suscripción activa."
};

// This should be extracted from a back-end service in future maybe.
export const AVAILABLE_COUNTRIES = {
  PE: {
    id: 1,
    countryCode: "pe",
    currencySymbol: "S/",
    currency: "PEN"
  },
  CL: {
    id: 2,
    countryCode: "cl",
    currencySymbol: "$",
    currency: "CLP"
  }
};

export const REFERRAL_COUPONS = () => {
  return process.env.NODE_ENV === "production"
    ? {
        referral20: "referido",
        referral40: "referido2",
        referral60: "referido3",
        referral80: "referido4"
      }
    : {
        referral20: "referido",
        referral40: "referido2",
        referral60: "referido3",
        referral80: "referido4"
      };
};

export const MAX_DISCONT_AMOUNT = universityId => {
  return universityId !== 8 ? 80 : 60;
};

export const SUBSCRIPTION_STATE = Object.freeze({
  freezed: "freezed",
  cancelled: "cancelled",
  suspended: "suspended",
  freemium: "freemium",
  subscribed: "subscribed"
});

export const ACCESS_TYPES = Object.freeze({
  auth: "auth",
  videoPlayer: "videoPlayer",
  quiz: "quiz"
});

export const MSG_NEED_AUTHENTICATION =
  "Se necesita autenticación para continuar";
export const MSG_USER_AUTHENTICATED = "Usuario autenticado";
export const MSG_SUSPENDED_OR_FREEZED_ACCOUNT =
  "El usuario está suspendido o congelado";
export const MSG_USER_ALLOWED = "Usuario permitido";
export const PACKAGE_PRICE = 109;

export const INGLES_PDN_ID = 7;
