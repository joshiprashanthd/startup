type Validator = (value: string) => boolean;

export const validatePassword: Validator = function (value: string) {
  return value.match(/^(?=.*\d).{8,}$/) !== null && value.length > 0;
};

export const validateName: Validator = function (value: string) {
  return value.match(/^[a-zA-Z\s]+$/) !== null && value.length > 0;
};

export const validateHandler: Validator = function (value: string) {
  return value.match(/^[a-zA-Z0-9]+$/) !== null && value.length > 0;
};
export const validateEmail: Validator = function (value: string) {
  return (
    value.match(
      /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
    ) !== null && value.length > 0
  );
};
