export const datetimeFormatter = date =>
  `${date.toDateString()}, ${date.toLocaleTimeString()}`;

export const dateFormatter = date =>
  `${date.toDateString()}`;

export const timeFormatter = date =>
  `${date.toLocaleTimeString()}`;
