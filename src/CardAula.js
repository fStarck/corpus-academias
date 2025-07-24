import React, { useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { ImPower } from "react-icons/im";
import ReactDOM from "react-dom";

const CardAula = ({ titulo, imagem, descricao, duracao, nivel, calorias }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Conteúdo do modal (usando Portal para renderizar fora do fluxo padrão do DOM)
  const modalContent = isModalOpen && (
    <>
      {/* Máscara cobrindo toda a tela */}
      {ReactDOM.createPortal(
        <div className="modal-mask" onClick={closeModal}></div>,
        document.body
      )}
      {/* Modal */}
      {ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-header">
            <h2>{titulo}</h2>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <img src={imagem} alt={titulo} className="card-image" style={{ maxWidth: "450px", width: "100%" }} />
            <div className="card-content">
              <div className="det-aula">
                <div className="aula-duracao">
                  <p>
                    <BsClockHistory /> <strong>Duração</strong>
                  </p>
                  <p>{duracao}</p>
                </div>
                <div className="aula-intensidade">
                  <p>
                    <ImPower /> <strong>Intensidade</strong>
                  </p>
                  <p>{nivel}</p>
                  {/* <p>{calorias}</p> */}
                </div>
              </div>
              <div className="divider"></div>
              <p className="aula-descricao">{descricao}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );

  return (
    <div className="card-aulas">
      <div className="card-aula">
        <img src={imagem} alt={titulo} className="card-image" />
        <div className="card-content">
        {/*   <h3>{titulo}</h3> */}
          <div className="det-aula">
            <div className="aula-duracao">
              <p>
                <BsClockHistory /> <strong>Duração</strong>
              </p>
              <p>{duracao}</p>
            </div>
            <div className="aula-intensidade">
              <p>
                <ImPower /> <strong>Intensidade</strong>
              </p>
              <p>{nivel}</p>
              {/*    <p>{calorias}</p> */}
            </div>
          </div>
          <div className="divider"></div>
          <p className="aula-descricao">{descricao}</p>
          {/*           <button onClick={openModal}>Saiba Mais</button> */}
        </div>
      </div>

      {/* Renderizando Modal */}
      {modalContent}
    </div>
  );
};

export default CardAula;
