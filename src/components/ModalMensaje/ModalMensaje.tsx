import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import "./ModalMensaje.scss";

interface ModalMensajeProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  tipo?: "success" | "error";
  onCerrar: () => void;
}

const ModalMensaje: React.FC<ModalMensajeProps> = ({
  abierto,
  titulo,
  mensaje,
  tipo = "success",
  onCerrar
}) => {
  if (!abierto) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-mensaje ${tipo}`}>
        <div className="modal-icon">
          {tipo === "success" ? <CheckCircle size={48} /> : <XCircle size={48} />}
        </div>

        <h2>{titulo}</h2>
        <p>{mensaje}</p>

        <button onClick={onCerrar} className="btn-modal">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalMensaje;
