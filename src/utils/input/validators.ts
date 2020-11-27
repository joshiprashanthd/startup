export const validateEmail = function (value: string) {
  return (
    value.match(/^(?:(?:[\w\.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/) !==
      null && value.length > 0
  );
};

export const validateHandler = function (value: string) {
  return value.match(/^\w+$/) !== null && value.length > 0;
};

export const validateName = function (value: string) {
  return (
    value.match(/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/) &&
    value.length > 0
  );
};

export const validatePassword = function (value: string) {
  return value.match(/^(?=.*\d).{8,}$/);
};
