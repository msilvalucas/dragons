import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '@/context/auth/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

import styles from './SignUp.module.css';

import DRAGON_IMAGE from '@/assets/bg-login.jpg';
import { Link } from 'react-router';

export function SignUp() {
  const { signUp } = useContext(AuthContext);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string()
        .required('Campo obrigatório')
        .min(6, 'A senha deve ter no mínimo 6 caracteres'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não coincidem')
        .required('Campo obrigatório'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        await signUp(values.email, values.password);
      } catch (error: any) {
        setErrors({ password: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={DRAGON_IMAGE} alt="Imagem de dragão" />
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Typography variant="title" as="h2" color="light">
          Crie sua conta
        </Typography>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@email.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          className={styles.inputLabel}
        />

        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="********"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
          showPasswordToggle
        />

        <Input
          label="Confirmar Senha"
          name="confirmPassword"
          type="password"
          placeholder="********"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
          showPasswordToggle
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          variant="secondary"
          size="lg"
        >
          Cadastrar
        </Button>

        <Link to="/login">
          <Typography
            as="a"
            variant="subtitle"
            color="secondary"
            className={styles.link}
          >
            Já tem conta? Faça login!
          </Typography>
        </Link>
      </form>
    </div>
  );
}
