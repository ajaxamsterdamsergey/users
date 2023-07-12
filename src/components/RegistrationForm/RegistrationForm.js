import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '../Button/Button';
import * as Yup from 'yup';
import axios from 'axios';
import './RegistrationForm.scss';

if (typeof window !== 'undefined') {
  injectStyle();
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Введите ваше имя')
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(60, 'Имя должно содержать не более 60 символов'),
  email: Yup.string()
    .required('Введите ваш email')
    .email('Некорректный формат email'),
  phone: Yup.string()
    .required('Введите ваш номер телефона')
    .matches(/^\+380\d{9}$/, 'Некорректный номер телефона. Формат: +380XXXXXXXXX'),
  position_id: Yup.number().required('Выберите вашу должность'),
  photo: Yup.mixed()
    .required('Загрузите вашу фотографию')
    .test(
      'fileSize',
      'Размер фотографии не должен превышать 5 МБ',
      (value) => {
        if (!value || !value.length) {
          return true;
        }
        const fileSizeInMB = value[0]?.size / (1024 * 1024);
        return fileSizeInMB <= 5;
      }
    ),
});

export const RegistrationForm = ({ updateUsers }) => {
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    axios
      .get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => {
        if (response.data.success) {
          setPositions(response.data.positions);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then((response) => {
        if (response.data.success) {
          setToken(response.data.token);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('position_id', values.position_id);

    if (values.photo && values.photo.length > 0) {
      const file = values.photo[0];
      const fileData = await readFile(file);
      formData.append('photo', fileData, file.name);
    }

    axios
      .post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {
        headers: {
          Token: token,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((response) => {
        updateUsers();
        toast.success(`Вітаю ${values.name}! Ви успішно пройшли реєстрацію \u{1F44D}`);
        resetForm();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div id='form-container'>
      <h1 className='title'>Working with POST request</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          position_id: positions.length > 0 ? positions[0].id : '',
          photo: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className='form-group'>
            <div className='wrapper-field'>
              <Field
                className='form-field'
                placeholder='Your name'
                type='text'
                id='name'
                name='name'
              />
              <ErrorMessage name='name' component='div' className='error-message' />
            </div>

            <div className='wrapper-field'>
              <Field
                className='form-field'
                placeholder='Email'
                type='email'
                id='email'
                name='email'
              />
              <ErrorMessage name='email' component='div' className='error-message' />
            </div>

            <div className='wrapper-field'>
              <Field
                className='form-field'
                placeholder='Phone'
                type='text'
                id='phone'
                name='phone'
              />
              <ErrorMessage name='phone' component='div' className='error-message' />
            </div>

            <div className='form-radio'>
              <label>Select your position:</label>
              {positions.map((position, index) => (
                <div key={position.id}>
                  <label>
                    <Field
                      type='radio'
                      name='position_id'
                      value={position.id}
                      checked={
                        values.position_id === position.id ||
                        (index === 0 && !values.position_id)
                      }
                      onChange={() => setFieldValue('position_id', position.id)}
                    />
                    {position.name}
                  </label>
                </div>
              ))}
              <ErrorMessage name='position_id' component='div' className='error-message' />
            </div>

            <div id='photo-wrapper'>
              <input
                className='form-field'
                type='file'
                id='photo'
                name='photo'
                accept='image/jpeg, image/jpg'
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFieldValue('photo', [file]);
                }}
              />
              <ErrorMessage name='photo' component='div' className='error-message' />
              {values.photo ? null : <div className='loll'>Upload your photo</div>}
            </div>

            <Button type='submit'>Sign Up</Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
