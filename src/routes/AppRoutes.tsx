

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Documentos from '../pages/Documentos/Documentos';
import Nosotros from '../pages/Nosotros/Nosotros';
import Servicios from '../pages/Servicios/Servicios';
import Horarios from '../pages/Horarios/Horarios';
import Productos from '../pages/Productos/Productos';
import Comunicados from '../pages/Comunicados/Comunicados';
import Encuestas from '../pages/Encuesta/Encuestas';
import FormularioDatosAlumno from '../pages/Encuesta/datosAlumno/formularioAlumno';
import FormularioPreguntas from '../pages/Encuesta/formPreguntas/FormularioPreguntas';

const AppRoutes = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/comunicados" element={<Comunicados />} />
            <Route path="/encuestas" element={<Encuestas />} />
            <Route path="/encuestas/:encuestaId/formulario" element={<FormularioDatosAlumno />}/>
            <Route path="/encuestas/:encuestaId/preguntas" element={<FormularioPreguntas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
