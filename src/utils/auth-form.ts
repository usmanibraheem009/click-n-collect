import * as Yup from 'yup';

export const initialValues = {
    signup: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    },
    login: {
        email: '',
        password: '',
    }
};

export const validationSchema = {
    signup: Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password is required'),
    }),
    login: Yup.object({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required')
    })
}