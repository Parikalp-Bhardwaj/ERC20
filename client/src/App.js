import logo from './logo.svg';
import Token from "./components/Token";
import {
  BrowserRouter 
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Token />
    </BrowserRouter>
  );
}

export default App;
