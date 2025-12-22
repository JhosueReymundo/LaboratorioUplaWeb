import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ModalMensaje from "../../../components/ModalMensaje/ModalMensaje";
import { 
  CheckCircle, MessageSquare, ListChecks, Hash, 
  ArrowRight, Loader, AlertCircle 
} from "lucide-react";
import { 
  encuestasService, 
  type CreateRespuestaDetalleDto, 
  type Pregunta 
} from "../services/encuestasService";
import "./FormularioPreguntas.scss";

const FormularioPreguntas: React.FC = () => {
  const { encuestaId } = useParams();
  const [searchParams] = useSearchParams();
  const respuestaId = Number(searchParams.get("respuestaId"));
  const navigate = useNavigate();

  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalTipo, setModalTipo] = useState<"success" | "error">("success");
  const [modalMensaje, setModalMensaje] = useState("");

  //const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    cargarPreguntas();
  }, []);

  const cargarPreguntas = async () => {
    try {
      const data = await encuestasService.getPreguntasByEncuesta(Number(encuestaId));
      setPreguntas(data);
    } catch (error) {
      console.error('Error al cargar preguntas:', error);
      alert('Error al cargar las preguntas');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (preguntaId: number, valor: any) => {
    setRespuestas({ ...respuestas, [preguntaId]: valor });
  };

  const handleSubmit = async () => {
    const sinResponder = preguntas.filter(p => !respuestas[p.id]);
    /* if (sinResponder.length > 0) {
      alert(`Por favor responde todas las preguntas. Faltan ${sinResponder.length} pregunta(s).`);
      return;
    } */
   if (sinResponder.length > 0) {
      setModalTipo("error");
      setModalMensaje(
        `Por favor responde todas las preguntas. Faltan ${sinResponder.length} pregunta(s).`
      );
      setMostrarModal(true);
      return;
    }


    setSubmitting(true);

    try {
      const detalles: CreateRespuestaDetalleDto[] = preguntas.map(p => {
        const val = respuestas[p.id];

        const detalle: CreateRespuestaDetalleDto = {
          respuesta_id: respuestaId,
          pregunta_id: p.id,
        };

        if (p.tipo === "abierta") detalle.texto = val;
        if (p.tipo === "opcion") detalle.opcion_id = Number(val);
        if (p.tipo === "numerica") detalle.valor_numerico = Number(val);

        return detalle;
      });

      await encuestasService.enviarRespuestasCompletas(respuestaId, detalles);

      setSubmitting(false);
      /* alert("¡Encuesta enviada exitosamente! Gracias por tu participación.");
      navigate("/encuestas"); */
      setModalTipo("success");
      setModalMensaje("¡Encuesta enviada exitosamente! Gracias por tu participación.");
      setMostrarModal(true);
    } catch (error) {
      /* console.error('Error al enviar:', error);
      alert('Error al enviar la encuesta. Intenta nuevamente.');
      setSubmitting(false); */
      setModalTipo("error");
      setModalMensaje("Ocurrió un error al enviar la encuesta. Intenta nuevamente.");
      setMostrarModal(true);
      setSubmitting(false);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'abierta':
        return <MessageSquare size={22} />;
      case 'opcion':
        return <ListChecks size={22} />;
      case 'numerica':
        return <Hash size={22} />;
      default:
        return <MessageSquare size={22} />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'abierta':
        return 'Respuesta abierta';
      case 'opcion':
        return 'Opción múltiple';
      case 'numerica':
        return 'Respuesta numérica';
      default:
        return 'Pregunta';
    }
  };

  const getProgress = () => {
    const respondidas = Object.keys(respuestas).length;
    return Math.round((respondidas / preguntas.length) * 100);
  };

  if (loading) {
    return (
      <div className="preguntas-loading">
        <Loader className="spinner" size={48} />
        <p>Cargando encuesta...</p>
      </div>
    );
  }

  return (
    <>
    <div className="formulario-preguntas-wrapper">
      <div className="formulario-preguntas">
        {/* Header */}
        <div className="preguntas-header">
          <div className="header-content">
            <div className="header-icon">
              <CheckCircle size={32} />
            </div>
            <h1 className="preguntas-titulo">Responder Encuesta</h1>
            <p className="preguntas-subtitulo">
              {preguntas.length} {preguntas.length === 1 ? 'pregunta' : 'preguntas'}
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="progress-bar-container">
            <div className="progress-info">
              <span>Progreso</span>
              <span className="progress-percentage">{getProgress()}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Preguntas */}
        <div className="preguntas-content">
          {preguntas.map((pregunta, index) => (
            <div 
              key={pregunta.id} 
              className={`pregunta-card ${respuestas[pregunta.id] ? 'respondida' : ''}`}
            >
              {/* Header de la pregunta */}
              <div className="pregunta-header">
                <div className="pregunta-numero">
                  {respuestas[pregunta.id] ? (
                    <CheckCircle size={20} className="check-icon" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="pregunta-tipo">
                  {getTipoIcon(pregunta.tipo)}
                  <span>{getTipoLabel(pregunta.tipo)}</span>
                </div>
              </div>

              {/* Texto de la pregunta */}
              <label className="pregunta-texto">
                {pregunta.texto}
                {!respuestas[pregunta.id] && (
                  <span className="obligatoria">*</span>
                )}
              </label>

              {/* Input según tipo */}
              <div className="pregunta-input">
                {pregunta.tipo === "abierta" && (
                  <textarea
                    value={respuestas[pregunta.id] || ''}
                    onChange={e => handleChange(pregunta.id, e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows={4}
                  />
                )}

                {pregunta.tipo === "opcion" && (
                  <div className="opciones-lista">
                    {pregunta.opciones.map(opcion => (
                      <label 
                        key={opcion.id} 
                        className={`opcion-item ${respuestas[pregunta.id] == opcion.id ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`pregunta-${pregunta.id}`}
                          value={opcion.id}
                          checked={respuestas[pregunta.id] == opcion.id}
                          onChange={e => handleChange(pregunta.id, e.target.value)}
                        />
                        <span className="opcion-radio"></span>
                        <span className="opcion-texto">{opcion.texto}</span>
                      </label>
                    ))}
                  </div>
                )}

                {pregunta.tipo === "numerica" && (
                  <input
                    type="number"
                    value={respuestas[pregunta.id] || ''}
                    onChange={e => handleChange(pregunta.id, e.target.value)}
                    placeholder="Ingresa un número"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer con botón de envío */}
        <div className="preguntas-footer">
          {Object.keys(respuestas).length < preguntas.length && (
            <div className="footer-aviso">
              <AlertCircle size={20} />
              <span>
                Faltan {preguntas.length - Object.keys(respuestas).length} pregunta(s) por responder
              </span>
            </div>
          )}

          <button 
            onClick={handleSubmit}
            className="btn-enviar"
            disabled={submitting || Object.keys(respuestas).length < preguntas.length}
          >
            {submitting ? (
              <>
                <Loader className="spinner-small" size={20} />
                Enviando...
              </>
            ) : (
              <>
                Enviar Encuesta
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>   

    <ModalMensaje
      abierto={mostrarModal}
      tipo={modalTipo}
      titulo={modalTipo === "success" ? "Encuesta enviada" : "Error"}
      mensaje={modalMensaje}
      onCerrar={() => {
        setMostrarModal(false);
        if (modalTipo === "success") {
          navigate("/encuestas");
        }
      }}
    />
  </> 
  );
};

export default FormularioPreguntas;