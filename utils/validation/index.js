export const required = value => !!value;

export const numeric = value => !Number.isNaN(Number(value));

export const alphanumeric = value => /^[a-z0-9]+\s*$/i.test(value);

export const password = value => minLength(value, 8);

export const minLength = (value, length) => value.length >= length;

export const email = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\s*$/i.test(value);

export const cellphone = value => value === '' || ( numeric(value) && value.length === 9 && value.charAt(0) == 9);

export default {
  required,
  password,
  numeric,
  alphanumeric,
  minLength,
  email,
  cellphone,
};
