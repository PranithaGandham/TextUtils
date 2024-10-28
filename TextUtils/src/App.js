import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import TextForm from './components/TextForm';
import About from './components/About';

function App() {
  return (
    <>
      <Navbar title="TextUtils" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TextForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
