import { Button } from './components/ui/Button/Button';
import { Input } from './components/ui/Input/Input';

function App() {
  return (
    <div>
      <Input label="E-mail" type="email" />
      <Button variant="primary">Primário</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="danger">Perigo</Button>
      <Button variant="warning">Aviso</Button>
    </div>
  );
}

export default App;
