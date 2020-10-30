export const validatePassword = function (value: string) {
  if (!value.match(/^(?=.*\d).{8,}$/) && value.length > 0)
    return "Password must be at least 8 characters long and must contain one digit.";
  return null;
};

export const validateName = function (value: string) {
  if (!value.match(/^[a-zA-Z\s]+$/) && value.length > 0)
    return "Names must not contain any numeric digit";
  return null;
};

export const validateHandler = function (value: string) {
  if (!value.match(/^[a-zA-Z0-9]+$/) && value.length > 0)
    return "Handler must be alphanumeric with no spaces";
  return null;
};
