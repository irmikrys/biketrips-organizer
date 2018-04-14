const LOGIN_ERROR_BAD_LOGIN = "login.error.badLogin";
const LOGIN_ERROR_UNAUTHORIZED = "login.error.unauthorized";
const LOGIN_ERROR_PRIVATE = "login.error.private";
const REGISTER_ERROR_USERNAME_EXISTS = "register.error.usernameExists";
const REGISTER_ERROR_EMAIL_EXISTS = "register.error.emailExists";
const REGISTER_UNKNOWN_ERROR = "userData.error.badRequest";
const APPLICATION_ERROR_USERNAME_EXISTS = "application.error.usernameExists";
const APPLICATION_ERROR_EMAIL_EXISTS = "application.error.emailExists";
const APPLICATION_USER_NOT_FOUND = "application.error.userNotFound";
const APPLICATION_EMAIL_NOT_FOUND = "application.error.emailNotFound";
const APPLICATION_UNAUTHORISED_NAME = "application.error.unauthorisedName";
const APPLICATION_UNAUTHORISED_EMAIL = "application.error.unauthorisedEmail";
const PARTICIPANT_ALREADY_ADDED = "addParticipant.error.userAlreadyAdded";
const PARTICIPANT_NOT_EXISTS = "addParticipant.error.userNotFound";

const ERRORS_MAP = new Map([
  [LOGIN_ERROR_BAD_LOGIN, "Bad login or password!"],
  [LOGIN_ERROR_UNAUTHORIZED, "You must be logged in first!"],
  [LOGIN_ERROR_PRIVATE, "You must be logged in first!"],
  [REGISTER_ERROR_USERNAME_EXISTS, "Username already exists!"],
  [REGISTER_ERROR_EMAIL_EXISTS, "Username already exists!"],
  [REGISTER_UNKNOWN_ERROR, "Password must be 8 characters including one uppercase letter and one digit!"],
  [APPLICATION_ERROR_USERNAME_EXISTS, "You've already sent your application!"],
  [APPLICATION_ERROR_EMAIL_EXISTS, "This email has already sent an application!"],
  [APPLICATION_USER_NOT_FOUND, "User doesn't exist!"],
  [APPLICATION_EMAIL_NOT_FOUND, "Wrong email!"],
  [APPLICATION_UNAUTHORISED_NAME, "Bad credentials!"],
  [APPLICATION_UNAUTHORISED_EMAIL, "Bad credentials!"],
  [PARTICIPANT_NOT_EXISTS], "Participant doesn't have an account!",
  [PARTICIPANT_ALREADY_ADDED], "Participant already added to trip!"
]);

export const getTranslatedErrorMessage = messageKey => ERRORS_MAP.get(messageKey);
