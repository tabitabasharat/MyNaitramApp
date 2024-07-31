import logo from './logo.svg';
import './App.css';
import Test from './Pages/Test';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
