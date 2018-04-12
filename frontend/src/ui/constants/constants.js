import { FormFieldBuilder } from "../component/forms/FormFieldBuilder";

export const MENU_FOR_USER = [
  {label: 'Apply', link: '/apply', icon: ''}
];

export const MENU_FOR_MODERATOR = [
  {label: 'Moderator', link: '/moderate', icon: ''}
];

export const MENU_FOR_GUEST = [
];

export const MENU_FOR_ADMIN = [
  {label: 'Applications', link: '/applications', icon: ''}
];

export const USER_RIGHT_ITEMS = [
  {label: 'Profile', link: '/profile', icon: 'glyphicon glyphicon-user'},
  {label: 'Logout', link: '/logout', icon: 'glyphicon glyphicon-log-out'}
];

export const MODERATOR_RIGHT_ITEMS = [
  {label: 'Profile', link: '/profile', icon: 'glyphicon glyphicon-user'},
  {label: 'Logout', link: '/logout', icon: 'glyphicon glyphicon-log-out'}
];

export const GUEST_RIGHT_ITEMS = [
  {label: 'Sign up', link: '/register', icon: 'glyphicon glyphicon-user'},
  {label: 'Sign in', link: '/login', icon: 'glyphicon glyphicon-log-in'}
];

export const ADMIN_RIGHT_ITEMS = [
  {label: 'Logout', link: '/logout', icon: 'glyphicon glyphicon-log-out'}
];


export const CREATE_MODE = "create";
export const UPDATE_MODE = "update";
export const READ_MODE = "read";


export const USERNAME = "username";
export const PASSWORD = "password";
export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const EMAIL = "email";
export const ROLE = "role";
export const ACTIVE = "active";

export const getFormField = fieldKey => FORM_FIELDS.get(fieldKey);

const FORM_FIELDS = new Map([
  [FIRST_NAME, new FormFieldBuilder()
    .withName(FIRST_NAME)
    .withPlaceholder("first name")
    .withType("text")
    .withPattern("[A-Za-z]{3,30}")
    .build()
  ],
  [LAST_NAME, new FormFieldBuilder()
    .withName(LAST_NAME)
    .withPlaceholder("last name")
    .withType("text")
    .withPattern("[A-Za-z]{3,30}")
    .build()
  ],
  [EMAIL, new FormFieldBuilder()
    .withName(EMAIL)
    .withPlaceholder("email")
    .withType("email")
    .build()
  ],
  [USERNAME, new FormFieldBuilder()
    .withName(USERNAME)
    .withPlaceholder("username")
    .withType("text")
    .withPattern("[A-Za-z][A-Za-z0-9]{3,14}")
    .build()
  ],
  [PASSWORD, new FormFieldBuilder()
    .withName(PASSWORD)
    .withPlaceholder("password")
    .withType("password")
    .withPattern("[A-Za-z0-9]{6,15}")
    .build()
  ]
]);
