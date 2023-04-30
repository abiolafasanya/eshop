import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(8, 'name should not be less than 8 characters')
      .required('name cannot be blank'),
    address: Yup.string().required('address cannot be blank'),
    state: Yup.string()
      .min(2, 'Too Short!')
      .required('state cannot be blank')
      .max(20, 'Too Long!'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('city cannot be blank'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().required('phone number cannot be blank'),
  });

   interface MyFormValues {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    state: string;
    city: string;
  }

  const initialValues: MyFormValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
  };

export {
  validationSchema, initialValues
};
export type { MyFormValues };
