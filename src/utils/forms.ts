import * as Yup from 'yup';
import { locationType } from '../redux/slices/addressSlice';

export const initialValues = {
    address: {
        id: '',
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        type: '' as locationType,
        phoneNumber: ''
    },
};

export const validationSchema = {
    address: Yup.object({
        country: Yup.string().required('country is required'),
        state: Yup.string().required('state is required'),
        city: Yup.string().required('city is required'),
        streetAddress: Yup.string().required('street address is required'),
        type: Yup.string().required('Address type is required'),
        phoneNumber: Yup.string().required('phone number is required').matches(/^\d{11}$/, 'Phone number must be 11 digits'),
    }),
}
