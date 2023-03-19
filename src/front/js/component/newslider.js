import React, { useState, useContext, useRef } from "react";
import "../../styles/sliderm.css";
import "../../styles/forall.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

//<SliderM data={bikesResults} groupSize={1} />

const NewSlider = ({ data, groupSize }) => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + groupSize;
  const dataToRender = data.slice(startIndex, endIndex);
  const [isVisible, setIsVisible] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const containerRef = useRef(null);

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
    <div className="d-flex flex-column">
      {dataToRender.map((url, idx) => {
        const index = startIndex + idx; // Crear una variable actualizada para el índice
        return (
          <div className="bordecitoall">
            <div
              key={index}
              className={`motocard w100 col-12 text-white bordecitob mx-auto ${
                isVisible ? " show-slider" : " hide-slider"
              }`}
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="col-12 d-flex ">
              <button
                className={` sizehomet boton-i px-0 col-2 text-white ${
                  startIndex === 0 ? " opa0" : " opa1"
                }`}
                onClick={handlePrevClick}
                disabled={startIndex === 0}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="col-8 px-0 text-white sizehomet">
                {(index + 1 + "").padStart(2, "0")}
              </div>
              <button
                className={` sizehomet boton-i col-2 px-0 text-white ${
                  endIndex >= data.length ? " opa0" : " opa1"
                }`}
                onClick={handleNextClick}
                disabled={endIndex >= data.length}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewSlider;
