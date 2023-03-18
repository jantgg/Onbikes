import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/forall.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Home = () => {
  const Navigate = useNavigate();
  const isDesktop = window.innerWidth >= 1000;
  const [showDivs, setShowDivs] = useState(false);
  const [showDivs2, setShowDivs2] = useState(false);
  const [showDivs3, setShowDivs3] = useState(false);
  const [moveOut, setMoveOut] = useState(false);

  const showOff = () => {
    setShowDivs(false);
    setShowDivs(false);
    setShowDivs(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowDivs(true);
      setTimeout(() => {
        setShowDivs2(true);
        setTimeout(() => {
          setShowDivs3(true);
        }, 400);
      }, 500);
    }, 150);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
        end: "bottom 35%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            elem,
            { y: 700, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "power1.out",
              overwrite: "auto",
            }
          );
        },
        onLeave: () => {},
        onEnterBack: () => {},
        onLeaveBack: () => {},
      });
    });
  }, []);
  return (
    <>
      {isDesktop ? (
        <div className="d-flex flex-column homeheight">
          {/* <div className="freehome"></div> */}
          <div
            className={`col-12 row mt-10  ${
              showDivs3 ? "slide-in " : "hidden"
            }`}
          >
            <div className="col-1"></div>
            <div className="col-5 imagen1 mx-auto bordecitoall px-1">
              <div className="card-content">
                {" "}
                <div className="col-12  text-white sizehome3 mx-auto text-center mt-3 spartan">
                  <b>Encuentra la moto perfecta</b>
                </div>
                <div className="col-11 text-white sizehomes mx-auto text-center mt-2 mb-3 ">
                  Responde a una seleccion de preguntas planteadas con el fin de
                  encontrar la moto que mejor se adapte a tus necesidades
                </div>
                <div className="mx-auto center-align">
                  <button
                    className={`botonaco mx-auto py-2 px-3 mt-2 mb-5 sizehomes ${
                      isDesktop ? "" : "w100"
                    }`}
                    onClick={() => {
                      Navigate("/test");
                      showOff();
                    }}
                  >
                    {" "}
                    <span style={{ "--i": 1 }}>H</span>
                    <span style={{ "--i": 2 }}>a</span>
                    <span style={{ "--i": 3 }}>c</span>
                    <span style={{ "--i": 4 }}>e</span>
                    <span style={{ "--i": 5 }}>r</span>
                    <span style={{ "--i": 6 }}>&nbsp;</span>
                    <span style={{ "--i": 7 }}>e</span>
                    <span style={{ "--i": 8 }}>l</span>
                    <span style={{ "--i": 9 }}>&nbsp;</span>
                    <span style={{ "--i": 10 }}>t</span>
                    <span style={{ "--i": 11 }}>e</span>
                    <span style={{ "--i": 12 }}>s</span>
                    <span style={{ "--i": 13 }}>t</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-5"></div>
          </div>
          <div className="freehome"></div>
          <div className={`col-12 row ${showDivs2 ? "slide-in" : " hidden"}`}>
            <div className="col-6"></div>
            <div className="col-5 imagen2 mx-auto bordecitoall ">
              <div className="col-12  text-white sizehome3 mx-auto text-center mt-3 spartan">
                <b>Visita lugares increíbles</b>
              </div>
              <div className="col-11 text-white sizehomes mx-auto text-center mt-2 mb-3 ">
                Encuentra las mejoras rutas creadas por y para moteros cerca de
                ti y descubre todo lo que pueden ofrecer nuestras carreteras
              </div>

              <div className="mx-auto center-align">
                <button
                  className={`botonaco mx-auto py-2 px-3 mt-2 mb-5 sizehomes ${
                    isDesktop ? "" : "w100"
                  }`}
                  onClick={() => {
                    Navigate("/bestroutes");
                  }}
                >
                  <span style={{ "--i": 1 }}>V</span>
                  <span style={{ "--i": 2 }}>e</span>
                  <span style={{ "--i": 3 }}>r</span>
                  <span style={{ "--i": 4 }}>&nbsp;</span>
                  <span style={{ "--i": 5 }}>l</span>
                  <span style={{ "--i": 6 }}>a</span>
                  <span style={{ "--i": 7 }}>s</span>
                  <span style={{ "--i": 8 }}>&nbsp;</span>
                  <span style={{ "--i": 9 }}>r</span>
                  <span style={{ "--i": 10 }}>u</span>
                  <span style={{ "--i": 11 }}>t</span>
                  <span style={{ "--i": 12 }}>a</span>
                  <span style={{ "--i": 13 }}>s</span>
                </button>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="freehome"></div>
          <div className={`col-12 row ${showDivs ? "slide-in " : "hidden"}`}>
            <div className="col-2"></div>
            <div className="col-6 imagen3 mx-auto pb-2 bordecitoall ">
              <div className="col-12 text-white sizehome3 mx-auto text-center mt-3 spartan">
                <b>Inmortaliza momentos únicos</b>
              </div>
              <div className="col-11 text-white sizehomes mx-auto text-center mt-2 mb-3 ">
                Consigue impresionantes fotos sobre tu montura con los mejores
                fotógrafos de nuestro país o únete como profesional a la mejor
                comunidad
              </div>

              <div className="mx-auto center-align">
                <button
                  className={`botonaco mx-auto py-2 px-3 mt-2 mb-5 sizehomes ${
                    isDesktop ? "" : "w100"
                  }`}
                  onClick={() => {
                    Navigate("/bestphotographers");
                  }}
                >
                  <span style={{ "--i": 1 }}>V</span>
                  <span style={{ "--i": 2 }}>e</span>
                  <span style={{ "--i": 3 }}>r</span>
                  <span style={{ "--i": 4 }}>&nbsp;</span>
                  <span style={{ "--i": 5 }}>p</span>
                  <span style={{ "--i": 6 }}>r</span>
                  <span style={{ "--i": 7 }}>o</span>
                  <span style={{ "--i": 8 }}>f</span>
                  <span style={{ "--i": 9 }}>e</span>
                  <span style={{ "--i": 10 }}>s</span>
                  <span style={{ "--i": 11 }}>i</span>
                  <span style={{ "--i": 12 }}>o</span>
                  <span style={{ "--i": 13 }}>n</span>
                  <span style={{ "--i": 14 }}>a</span>
                  <span style={{ "--i": 15 }}>l</span>
                  <span style={{ "--i": 16 }}>e</span>
                  <span style={{ "--i": 17 }}>s</span>
                </button>
              </div>
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};
