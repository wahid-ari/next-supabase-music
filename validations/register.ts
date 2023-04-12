import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required("Name can't be empty").typeError('Name must be valid'),
  username: yup
    .string()
    .required("Username can't be empty")
    .matches(/^[A-Za-z]*$/, 'Username must be alphabet without space')
    .typeError('Username must be valid'),
  password: yup.string().required("Password can't be empty").typeError('Password must be valid'),
});

export async function validateRegister(data: any) {
  try {
    await registerSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (err) {
    return { valid: false, errors: err.errors };
  }
}
