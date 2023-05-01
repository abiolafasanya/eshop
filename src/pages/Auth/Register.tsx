import {FormEvent, useState} from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'
import { Link } from 'react-router-dom';
import Axios from '../../api/Axios';
import styles from './Login.module.scss';
import { FaUpload } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [showPassword, setShowPasswords] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // const [avatar, setAvatar] = useState()
  const [avatar, setAvatar] = useState<File | any>()

  function handleFileUpload(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();

const file: File | null = e.currentTarget.files?.item(0) ?? null;
if (file) {
  setAvatar(URL.createObjectURL(file));
}
  }

  async function handleRegistration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  try {
    
    const input = e.target as HTMLInputElement & {
      email: {value: string},
      password: {value: string},
      confirmPassword: {value: string},
      upload: {files: File | unknown}
    }
    
    
    if(input.password.value !== input.confirmPassword.value) {
      console.log("password mismatch");
      toast.error("password does not match");
      return false
    }
    
    const body = {
      email: input.email.value,
      password: input.password.value,
      image: (input.upload.files as FileList)[0]
    }
    

    if (body.email === '' || body.password === '') {
      toast.error('Please fill in your email and password');
      return;
    }
    
    const ENDPOINT = `${import.meta.env.VITE_SERVER_API_URL}/auth/signup`;
    const {data, status} = await Axios.post(ENDPOINT, body)
    
    if(data.error){
      console.log(data.error)
      toast.error(data.message)
      return
    }
    if(status === 200){
      toast.success(data.message)
      console.log(data)
      return
    } 

  } catch (error) { /* empty */ }    
  }

  return (
    <main className={styles.login}>
      <div className={styles.card}>
        <h2 className={styles.card_title}>Register an account</h2>
        <form onSubmit={handleRegistration} className={styles.form}>
          <div className={styles.form_group}>
            <input
              type="email"
              className={styles.form_control}
              placeholder="johndoe@gmail.com"
              id='email'
            />
          </div>
          <div className={styles.form_group}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.form_control}
              placeholder="Password"
              id='password'
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                onClick={() => setShowPasswords((bool) => !bool)}
                className={styles.form_eye}
              />
            ) : (
              <AiOutlineEye
                onClick={() => setShowPasswords((bool) => !bool)}
                className={styles.form_eye}
              />
            )}
          </div>
          <div className={styles.form_group}>
            <input
              type={showConfirm ? 'text' : 'password'}
              className={styles.form_control}
              placeholder="Confirm Password"
              id='confirmPassword'
            />
            {showConfirm ? (
              <AiOutlineEyeInvisible
                onClick={() => setShowConfirm((bool) => !bool)}
                className={styles.form_eye}
              />
            ) : (
              <AiOutlineEye
                onClick={() => setShowConfirm((bool) => !bool)}
                className={styles.form_eye}
              />
            )}
          </div>
          <div className={styles.form_group}>
            <div className={styles.form_upload}>
              {avatar ? (<img src={avatar} alt='avatar' className={styles.avatar} />)
              :
              <RxAvatar className={styles.form_avatar} />
              }
            <label htmlFor="upload" className={styles.fileUpload}>
              <span>Upload a file</span> <FaUpload />
              <input type="file" id="upload" className={styles.hidden} 
              onChange={handleFileUpload}
              accept='.jpg,.png,.jpeg' />
            </label>
            </div>

          </div>
          <div className="form-group my-0 mt-2">
            <button className={styles.form_btn}>Register</button>
          </div>
          <div className={styles.form_other}>
            <h4>Have an account?</h4>
            <Link to={'/login'} className='text-blue-500'>Login</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};
// const fileUpload = 'ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700'
export default Register;
