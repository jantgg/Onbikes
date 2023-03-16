import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import "../../styles/modalimagen.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

//<SliderPhotos data={bikesResults} groupSize={4} />

const SliderPhotos = ({ data, groupSize }) => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + groupSize;
  const dataToRender = data.slice(startIndex, endIndex);
  const [isVisible, setIsVisible] = useState(true);

  // MODAL FOTOS --------------------------------------------------------------------------------------------------------->
  // const [mostrarModalFotos, setMostrarModalFotos] = useState(false);

  const handleNextClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStartIndex(startIndex + groupSize);
      setTimeout(() => {
        setIsVisible(true);
      }, 250);
    }, 200);
  };

  const handlePrevClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      setStartIndex(Math.max(startIndex - groupSize, 0));
      setTimeout(() => {
        setIsVisible(true);
      }, 250);
    }, 200);
  };

  return (
    <>
      <div
        className={`sliderbueno mx-auto row p-3 ${
          isVisible ? "show-slider" : "hide-slider"
        }`}
      >
        <button
          className={` sizehomet sliderbtn text-white${
            startIndex === 0 ? " opa0" : " opa1"
          }`}
          onClick={handlePrevClick}
          disabled={startIndex === 0}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div
          className={`item-container col-10 mx-0 px-0 ${
            isVisible ? " show-slider" : " hide-slider"
          }`}
        >
          {dataToRender.map((url) => (
            <>
              {/* <div
                key={url}
                className="colpp mx-auto"
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "20vw",
                }}
                alt="Preview"
              >
                <button
                  onClick={(e) => {
                    setMostrarModalFotos(true);
                  }}
                >
                  {" "}
                  aumentar
                </button>
              </div> */}
              <img
                style={{ objectFit: "cover" }}
                className="colpp mx-auto"
                src={url}
                alt="Preview"
                key={url}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   setMostrarModalFotos(true);
                // }}
              />
              {/* {mostrarModalFotos && (
                <div className="modalfotos">
                  <div className="modal-contenidofotos">
                    <div className="spartan sizehomet text-white ">
                      <img
                        style={{ objectFit: "cover" }}
                        className="colpp mx-auto"
                        src={url}
                        alt="Preview"
                        key={url}
                      />
                      <button
                        className="botonaco"
                        onClick={setMostrarModalFotos(false)}
                      >
                        {" "}
                        <span>Cerrar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
            </>
          ))}
        </div>

        <button
          className={` sizehomet sliderbtn text-white${
            endIndex >= data.length ? " opa0" : " opa1"
          }`}
          onClick={handleNextClick}
          disabled={endIndex >= data.length}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
};

export default SliderPhotos;
