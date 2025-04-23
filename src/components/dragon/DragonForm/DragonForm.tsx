import { useFormik } from 'formik';
import * as Yup from 'yup';

import { DragonInterface } from '@/types/dragon';

import styles from './DragonForm.module.css';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DynamicIcon } from 'lucide-react/dynamic';

interface RegisterDragonProps {
  initialValues?: DragonInterface;
  onSubmit: (data: DragonInterface) => void;
}

const dragonSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  type: Yup.string().required('Tipo é obrigatório'),
  createdAt: Yup.string().required('Data de criação é obrigatória'),
  histories: Yup.array()
    .of(Yup.string().required('História não pode estar vazia'))
    .min(1, 'Pelo menos uma história é obrigatória'),
});

const defaultValues: DragonInterface = {
  id: '',
  name: '',
  type: '',
  createdAt: '',
  histories: [''],
  imageUrl: '',
};

export function DragonForm({ initialValues, onSubmit }: RegisterDragonProps) {
  const formik = useFormik({
    initialValues: initialValues || defaultValues,
    validationSchema: dragonSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({ ...values });
    },
  });

  const handleHistoryChange = (index: number, value: string) => {
    const updated = [...formik.values.histories];
    updated[index] = value;
    formik.setFieldValue('histories', updated);
  };

  const handleAddHistory = () => {
    formik.setFieldValue('histories', [...formik.values.histories, '']);
  };

  const handleRemoveHistory = (index: number) => {
    const updated = formik.values.histories.filter((_, i) => i !== index);
    formik.setFieldValue('histories', updated);
  };

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <div className={styles.formGroup}>
        <Input
          label="Nome do dragão"
          name="name"
          placeholder="Nome do dragão"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          label="Tipo do dragão"
          name="type"
          placeholder="Tipo do dragão"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && formik.errors.type}
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          label="Data de criação"
          type="date"
          name="createdAt"
          value={formik.values.createdAt}
          onChange={formik.handleChange}
          error={formik.touched.createdAt && formik.errors.createdAt}
        />
      </div>

      <div className={styles.formGroup}>
        {formik.values.histories.map((h, index) => (
          <div key={index} className={styles.formGroupHistory}>
            <textarea
              placeholder="História do dragão"
              className={styles.textarea}
              value={h}
              onChange={(e) => handleHistoryChange(index, e.target.value)}
            />
            <Button
              type="button"
              size="sm"
              variant="danger"
              icon={<DynamicIcon name="trash" />}
              onClick={() => handleRemoveHistory(index)}
              className={styles.btnRemove}
            />
          </div>
        ))}
        <Button
          size="lg"
          icon={<DynamicIcon name="plus" />}
          type="button"
          onClick={handleAddHistory}
        >
          Adicionar História
        </Button>
      </div>

      <Button
        size="lg"
        variant="secondary"
        icon={<DynamicIcon name="pencil" />}
        type="submit"
      >
        {initialValues ? 'Salvar Alterações' : 'Cadastrar Dragão'}
      </Button>
    </form>
  );
}
