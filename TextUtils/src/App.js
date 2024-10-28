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
          <Route path="https://textutils-gp2n38gw7-pranithagandhams-projects.vercel.app/" element={<TextForm />} />
          <Route path="https://textutils-gp2n38gw7-pranithagandhams-projects.vercel.app//about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
