import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Axios from '../../api/Axios';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import { AxiosError } from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPasswords] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { auth, handleSetAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      redirect('/');
    }
  }, [auth?.isLoggedIn]);

  async function registerHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = e.target as HTMLInputElement & {
      email: { value: string };
      password: { value: string };
    };

    try {
      const body = {
        email: input.email.value,
        password: input.password.value,
      };

      if (body.email === '' || body.password === '') {
        toast.error('Please fill in your email and password');
        return;
      }

    const ENDPOINT = `${import.meta.env.VITE_SERVER_API_URL}/auth` || 'http://localhost:5000/auth'

      const response = await Axios.post(ENDPOINT, body);

      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message as string);
        // redirect user to desired page
        const res = {
          isLoggedIn: response.data.success,
          token: response.data.accessToken,
          user: response.data.data,
        };
        // console.log(res);

        handleSetAuth(res);
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 3000);
        return;
      }
      if (response.status === 400 || response.status === 401) {
        toast.error(response?.data?.message as string);
        return;
      }
      if (response.data.error || response.status === 500) {
        toast.error(response?.data?.message as string);
        console.error(
          'Error occurred during login:',
          response?.data?.message as string
        );
        return;
      }
    } catch (error) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        const errorMessage = (error as AxiosError).message;
        console.log('Error message:', errorMessage);
        toast.error(errorMessage);
      }
      toast.error('login failed');
      console.error('Error occurred during login:', error);
    }
  }
  return (
    <main className={styles.login}>
      <div className={styles.card}>
        <h2 className={styles.card_title}>Login to your account</h2>
        <form onSubmit={registerHandler} className={styles.form}>
          <div className={styles.form_group}>
            <input
              type="email"
              className={styles.form_control}
              placeholder="Email Address *"
              id="email"
            />
          </div>
          <div className={styles.form_group}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.form_control}
              placeholder="Password *"
              id="password"
            />

            {showPassword ? (
              <Visibility 
              onClick={() => setShowPasswords((bool) => !bool)}
              className={styles.form_eye}
              />
            ) : (
              <VisibilityOff 
             onClick={() => setShowPasswords((bool) => !bool)}
             className={styles.form_eye}
             />
            )}
          </div>

          <div className={styles.form_group}>
            <button className={styles.form_btn}>Login</button>
          </div>
          <div className={styles.form_other}>
            <h4>Don't have an account?</h4>
            <Link to={'/register'} className="text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};
export default Login;
