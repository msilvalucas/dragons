import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DragonFormValues } from '@/types/form';
import * as Yup from 'yup';

interface Props {
  initialValues: DragonFormValues;
  onSubmit: (values: DragonFormValues) => void;
}

export function DragonForm({ initialValues, onSubmit }: Props) {
  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    type: Yup.string().required('Tipo é obrigatório'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label htmlFor="name">Nome</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" component="span" />

        <label htmlFor="type">Tipo</label>
        <Field name="type" type="text" />
        <ErrorMessage name="type" component="span" />

        <button type="submit">Salvar</button>
      </Form>
    </Formik>
  );
}
