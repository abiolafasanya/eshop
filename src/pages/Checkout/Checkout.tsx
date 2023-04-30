import React, { useEffect, useState } from 'react';
import styles from './Checkout.module.scss';
import useCart from '../../hooks/useCart';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import {
  Box,
  Button,
  Divider,
  ListItem,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { validationSchema, MyFormValues, initialValues } from './helper';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { redirect } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatter';
import { PaystackButton } from 'react-paystack';
import { v4 as uuid } from 'uuid';


type PaystackConfig = {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}

interface IPaystackComponent {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (reference: any) => void;
  onClose: () => void;
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}

const Checkout = () => {
  const steps = ['Login', 'Complete chekout form', 'Payment'];
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;
  const { auth } = useAuth();
  const { cartTotal, products, cartQuantity, cartItems } = useCart();
  const [info, setInfo] = useState(initialValues);
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState<PaystackConfig>({
    reference: '',
    email: '',
    amount: 0,
    publicKey
  })

 
  const handlePaystackSuccessAction = (reference: unknown) => {
    console.log(reference);
    setStep(3)
  }

  const handlePaystackCloseAction = () => {
    console.log('close');
  }

  const componentProps = {
    ...config,
    text: 'Checkout Now',
    onSuccess: (reference: unknown) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
};

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (!auth?.isLoggedIn) redirect('/login');
  }, [auth?.isLoggedIn]);

  const handleSubmit = (
    values: MyFormValues,
    { setSubmitting }: FormikHelpers<MyFormValues>
  ) => {
    console.log(values);
    console.log(setSubmitting);
    setConfig ({
      reference: uuid(),
      ...info,
      email: auth?.user?.email || '',
      amount: (cartTotal(products)*100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey
    });
  
    setStep(1)
    setInfo(values);
  };

  return (
    <>
      {auth?.isLoggedIn ? (
        <main className={styles.container}>
          <div className={styles.checkout}>
            <Box className={styles.checkout_form}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <CheckoutForm step={step} componentProps={componentProps}/>
              </Formik>
            </Box>
            <Box className={styles.checkout_card}>
              <Box className={styles.checkout_status}>
                <Stepper activeStep={step} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <h3>Order Summary</h3>
              <Box className={styles.checkout_card_group}>
                <ListItem className={styles.checkout_card_item}>
                  <div>Subtotal</div>
                  <div>$1200</div>
                </ListItem>
                <Divider className={styles.border} />
                <ListItem className={styles.checkout_card_item}>
                  <div>Shipping</div>
                  <div>Free</div>
                </ListItem>
                <Divider className={styles.border} />
                <ListItem className={styles.checkout_card_item}>
                  <div>Quantity</div>
                  <div>{cartQuantity}</div>
                </ListItem>
                <Divider className={styles.border} />
                <ListItem className={styles.checkout_card_item}>
                  <div>Item</div>
                  <div>
                    {cartItems?.map((item, i) => {
                      const product = products?.find((p) => p.id === item.id);
                      return (
                        <div key={i}>
                          {product ? (
                            <span key={Date.now()}>{product.title}</span>
                          ) : (
                            ''
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ListItem>
                <Divider className={styles.border} />

                <ListItem className={styles.checkout_card_item}>
                  <div>Location</div>
                  <div>{info.address}</div>
                </ListItem>
                <Divider className={styles.border} />
                <ListItem className={styles.checkout_card_item}>
                  <div>Estimated Total</div>
                  <div>{formatCurrency((cartTotal(products)*100))}</div>
                </ListItem>
              </Box>
            </Box>
          </div>
        </main>
      ) : (
        <Navigate to={'/login'} state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

const CheckoutForm: React.FC<{step: number, componentProps: IPaystackComponent}> = ({step, componentProps}) => {
  return (
    <Form autoComplete="false">
      <div className={styles.checkout_form_group}>
        <h3>Personal Information</h3>
        <Field type="text" name="fullName" placeholder="Enter Full Name *" />
        <ErrorMessage
          name="fullName"
          render={(msg) => <div className={styles.form_error_msg}> {msg} </div>}
        />

        <Field type="email" name="email" placeholder="Email *" />
        <ErrorMessage
          name="email"
          render={(msg) => <div className={styles.form_error_msg}> {msg} </div>}
        />

        <Field type="tel" name="phoneNumber" placeholder="Enter Phone Number" />
        <ErrorMessage
          name="phoneNumber"
          render={(msg) => <div className={styles.form_error_msg}> {msg} </div>}
        />
      </div>

      <div className={styles.checkout_form_group}>
        <h3>Shipping Address</h3>
        <div className={styles.dropdown}>
          <label htmlFor="states">
            <MdOutlineArrowDropDownCircle className={styles.dropdown_icon} />
          </label>
          <Field as="select" name="state">
            <option selected disabled>Choose State</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
            <option value="ibadan">Ibadan</option>
            <option value="portacourt">Portacourt</option>
            <option value="ogun">Ogun</option>
            <option value="kaduna">kaduna</option>
          </Field>
          <ErrorMessage
            name="state"
            render={(msg) => (
              <div className={styles.form_error_msg}> {msg} </div>
            )}
          />
        </div>

        <Field type="text" name="address" placeholder={'Address *'} />
        <ErrorMessage
          name="address"
          render={(msg) => <div className={styles.form_error_msg}> {msg} </div>}
        />

        <Field type="text" name="city" placeholder="City" />
        <ErrorMessage
          name="city"
          render={(msg) => <div className={styles.form_error_msg}> {msg} </div>}
        />
      </div>
      {/* <RiInformationLine /> */}
      {step == 0 && <Button
        type="submit"
        variant={'contained'}
        className={styles.checkout_form_btn}
      >
        Continue
      </Button>}
      {step == 1 &&  <PaystackButton className={styles.checkout_paystack} {...componentProps} />}
    </Form>
  );
};

export default Checkout;
