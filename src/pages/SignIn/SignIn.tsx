import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '@/context/auth/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

import styles from './SignIn.module.css';

import DRAGON_IMAGE from '@/assets/bg-login.jpg';
import { Link } from 'react-router';

export function SignIn() {
  const { signIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(true);
        await signIn(values.email, values.password);
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

      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <Typography variant="title" as="h2" color="light">
          Acesse sua conta
        </Typography>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@email.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          className={styles.inputLabel}
        />

        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="********"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          showPasswordToggle
        />

        <Button
          type="submit"
          fullWidth
          isLoading={formik.isSubmitting}
          variant="secondary"
          size="lg"
        >
          {formik.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>

        <Link to="/cadastro">
          <Typography
            as="a"
            variant="subtitle"
            color="secondary"
            className={styles.link}
          >
            Não tem conta? Cadastre-se!
          </Typography>
        </Link>
      </form>
    </div>
  );
}
