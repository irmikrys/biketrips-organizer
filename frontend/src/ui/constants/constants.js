import {FormFieldBuilder} from "../component/forms/FormFieldBuilder";

export const MENU_FOR_USER = [
  {label: 'Trips', link: '/trips', icon: ''},
  {label: 'Apply', link: '/apply', icon: ''}
];

export const MENU_FOR_MODERATOR = [
  {label: 'Trips', link: '/trips', icon: ''},
];

export const MENU_FOR_GUEST = [];

export const MENU_FOR_ADMIN = [
  {label: 'Applications', link: '/applications', icon: ''}
];

export const USER_RIGHT_ITEMS = [];

export const MODERATOR_RIGHT_ITEMS = [];

export const GUEST_RIGHT_ITEMS = [
  {label: 'Sign up', link: '/register', icon: 'glyphicon glyphicon-user'},
  {label: 'Sign in', link: '/login', icon: 'glyphicon glyphicon-log-in'}
];

export const ADMIN_RIGHT_ITEMS = [
  {label: 'Logout', link: '/logout', icon: 'glyphicon glyphicon-log-out'}
];

export const LEFT_DROPDOWN_GUEST = null;
export const LEFT_DROPDOWN_USER = null;
export const LEFT_DROPDOWN_ADMIN = null;

export const LEFT_DROPDOWN_MODER = {
  label: 'Moderator', link: '#', children: [
    {label: 'Create Trip', link: '/create-trip', icon: 'glyphicon glyphicon-leaf'},
    {label: 'Add/Edit episodes', link: '/edit-episodes', icon: 'glyphicon glyphicon-picture'},
    {label: 'Add/Edit participants', link: '/edit-participants', icon: 'glyphicon glyphicon-user'},
    {label: 'See created trips', link: '/moderator-trips', icon: 'glyphicon glyphicon-eye-open'}
  ]
};

export const RIGHT_DROPDOWN_GUEST = null;
export const RIGHT_DROPDOWN_ADMIN = null;

export const RIGHT_DROPDOWN_MODER = {
  label: 'User', link: '#', children: [
    {label: 'Profile', link: '/profile', icon: 'glyphicon glyphicon-user'},
    {label: 'Logout', link: '/logout', icon: 'glyphicon glyphicon-log-out'}
  ]
};

export const RIGHT_DROPDOWN_USER = {
  label: 'User', link: '#', children: [
    {label: 'Profile', link: '/profile', icon: 'glyphicon glyphicon-user'},
    {label: 'Logout', link: '/logout', icon: 'glyphicon glyphicon-log-out'}
  ]
};

export const FOOTER_ITEMS = [
  {label: 'About', link: '/about', icon: 'glyphicon glyphicon-info-sign'},
  {label: 'Contact', link: '/contact', icon: 'glyphicon glyphicon-envelope'}
];

export const ADDRESS =
  "Bike Trips" +
  "\n AGH University of Science and Technology" +
  "\n al. Mickiewicza 30" +
  "\n 30-059 Cracow" +
  "\n Poland";

export const DROPZONE_ACTIVE = "Hide dropzone";
export const DROPZONE_INACTIVE = "Add photos";

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
