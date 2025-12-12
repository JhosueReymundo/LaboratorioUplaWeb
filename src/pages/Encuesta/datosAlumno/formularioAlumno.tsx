/* import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encuestasService, type CreateRespuestaDto, type Escuela } from "../services/encuestasService";
import "./datosalumno.scss";

const FormularioDatosAlumno: React.FC = () => {
  const { encuestaId } = useParams();
  const navigate = useNavigate();

  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  const [formData, setFormData] = useState<CreateRespuestaDto>({
    encuesta_id: Number(encuestaId),
    email: "",
    codigo_estudiante: "",
    escuelaId: 0,
    ciclo: "",
  });

  useEffect(() => {
    cargarEscuelas();
  }, []);

  const cargarEscuelas = async () => {
    const data = await encuestasService.getEscuelas();
    setEscuelas(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const respuesta = await encuestasService.crearRespuesta(formData);
    console.log('Respuesta creada con ID:', respuesta.id);
    
    // Navega pasando el ID
    navigate(`/encuestas/${encuestaId}/preguntas?respuestaId=${respuesta.id}`);
  } catch (error) {
    console.error('Error completo:', error);
    alert('Error al guardar datos: ' );
  }
};

  return (
    <div className="formulario-alumno">
      <h2>Datos del Estudiante</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Código del estudiante:</label>
        <input 
          type="text" 
          name="codigo_estudiante" 
          value={formData.codigo_estudiante}
          onChange={handleChange}
          required
        />

        <label>Escuela:</label>
        <select name="escuelaId" value={formData.escuelaId} onChange={handleChange} required>
          <option value="">Seleccionar...</option>
          {escuelas.map(e => (
            <option key={e.id} value={e.id}>{e.nombreEscuela}</option>
          ))}
        </select>

        <label>Ciclo:</label>
        <input 
          type="text" 
          name="ciclo"
          value={formData.ciclo}
          onChange={handleChange}
          required
        />

        <button type="submit">Continuar</button>
      </form>
    </div>
  );
};

export default FormularioDatosAlumno;
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mail, User, GraduationCap, BookOpen, ArrowRight, Loader } from "lucide-react";
/* import { encuestasService, type CreateRespuestaDto, type Escuela } from "../../services/encuestasService"; */
import "./datosalumno.scss";
import { encuestasService, type CreateRespuestaDto, type Escuela } from "../services/encuestasService";

const FormularioDatosAlumno: React.FC = () => {
  const { encuestaId } = useParams();
  const navigate = useNavigate();

  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateRespuestaDto>({
    encuesta_id: Number(encuestaId),
    email: "",
    codigo_estudiante: "",
    escuelaId: 0,
    ciclo: "",
  });

  const ciclos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  useEffect(() => {
    cargarEscuelas();
  }, []);

  const cargarEscuelas = async () => {
    try {
      const data = await encuestasService.getEscuelas();
      setEscuelas(data);
    } catch (error) {
      console.error('Error al cargar escuelas:', error);
      alert('Error al cargar las escuelas profesionales');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const respuesta = await encuestasService.crearRespuesta(formData);
      console.log('Respuesta creada con ID:', respuesta.id);
      
      // Navega a las preguntas
      navigate(`/encuestas/${encuestaId}/preguntas?respuestaId=${respuesta.id}`);
    } catch (error) {
      console.error('Error completo:', error);
      alert('Error al guardar datos. Por favor, verifica la información.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="formulario-alumno-loading">
        <Loader className="spinner" size={48} />
        <p>Cargando formulario...</p>
      </div>
    );
  }

  return (
    <div className="formulario-alumno-wrapper">
      <div className="formulario-alumno">
        {/* Header decorativo */}
        <div className="formulario-header">
          <div className="header-icon">
            <User size={32} />
          </div>
          <h1 className="formulario-titulo">Datos del Estudiante</h1>
          <p className="formulario-subtitulo">
            Completa tus datos para comenzar la encuesta
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="formulario-content">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={18} />
              Correo Institucional
            </label>
            <input 
              id="email"
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="r06471d@ms.upla.edu.pe"
              /* pattern="^[a-zA-Z0-9._%+-]+@ms\.upla\.edu\.pe$" */
              required
            />
          </div>

          {/* Código de estudiante */}
          <div className="form-group">
            <label htmlFor="codigo_estudiante">
              <User size={18} />
              Código de Estudiante
            </label>
            <input 
              id="codigo_estudiante"
              type="text" 
              name="codigo_estudiante" 
              value={formData.codigo_estudiante}
              onChange={handleChange}
              placeholder="R06471D"
              required
            />
          </div>

          {/* Escuela Profesional */}
          <div className="form-group">
            <label htmlFor="escuelaId">
              <GraduationCap size={18} />
              Escuela Profesional
            </label>
            <div className="select-wrapper">
              <select 
                id="escuelaId"
                name="escuelaId" 
                value={formData.escuelaId} 
                onChange={handleChange} 
                required
              >
                <option value="">Selecciona tu escuela...</option>
                {escuelas.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.nombreEscuela}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ciclo */}
          <div className="form-group">
            <label htmlFor="ciclo">
              <BookOpen size={18} />
              Ciclo Académico
            </label>
            <div className="select-wrapper">
              <select 
                id="ciclo"
                name="ciclo"
                value={formData.ciclo}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tu ciclo...</option>
                {ciclos.map(c => (
                  <option key={c} value={c}>
                    Ciclo {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón de envío */}
          <button 
            type="submit" 
            className="btn-continuar"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader className="spinner-small" size={20} />
                Guardando...
              </>
            ) : (
              <>
                Continuar a la Encuesta
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="formulario-footer">
          <p>
            <span className="icon-info">ℹ️</span>
            Tus datos son confidenciales y solo se usarán con fines estadísticos
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormularioDatosAlumno;