import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9+\-().x\s]+$/, 'Phone number is invalid'),
  website: yup
    .string()
    .required('Website is required')
    .url('Website must be a valid URL'),
  address: yup.object().shape({
    street: yup
      .string()
      .required('Street is required')
      .min(5, 'Street must be at least 5 characters'),
    suite: yup
      .string()
      .required('Suite/Apartment is required'),
    city: yup
      .string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters'),
    zipcode: yup
      .string()
      .required('Zipcode is required')
      .matches(/^[0-9\-]+$/, 'Zipcode must contain only numbers and hyphens'),
    geo: yup.object().shape({
      lat: yup
        .string()
        .required('Latitude is required')
        .matches(/^-?\d+(\.\d+)?$/, 'Latitude must be a valid number'),
      lng: yup
        .string()
        .required('Longitude is required')
        .matches(/^-?\d+(\.\d+)?$/, 'Longitude must be a valid number'),
    }),
  }),
  company: yup.object().shape({
    name: yup
      .string()
      .required('Company name is required')
      .min(2, 'Company name must be at least 2 characters'),
    catchPhrase: yup
      .string()
      .required('Catch phrase is required'),
    bs: yup
      .string()
      .required('Business segment is required'),
  }),
});

export const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: yup
    .string()
    .email('Email must be a valid email address'),
  phone: yup
    .string()
    .matches(/^[0-9+\-().x\s]+$/, 'Phone number is invalid'),
  website: yup
    .string()
    .url('Website must be a valid URL'),
  address: yup.object().shape({
    street: yup
      .string()
      .min(5, 'Street must be at least 5 characters'),
    suite: yup.string(),
    city: yup
      .string()
      .min(2, 'City must be at least 2 characters'),
    zipcode: yup
      .string()
      .matches(/^[0-9\-]+$/, 'Zipcode must contain only numbers and hyphens'),
    geo: yup.object().shape({
      lat: yup
        .string()
        .matches(/^-?\d+(\.\d+)?$/, 'Latitude must be a valid number'),
      lng: yup
        .string()
        .matches(/^-?\d+(\.\d+)?$/, 'Longitude must be a valid number'),
    }),
  }),
  company: yup.object().shape({
    name: yup
      .string()
      .min(2, 'Company name must be at least 2 characters'),
    catchPhrase: yup.string(),
    bs: yup.string(),
  }),
});