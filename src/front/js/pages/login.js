import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import "../../styles/login.css";
import "../../styles/animations.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialserror, setCredentialsError] = useState(false);
  const [showDivs, setShowDivs] = useState(false);
  const [showDivs2, setShowDivs2] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveOut, setMoveOut] = useState(false);
  const isDesktop = window.innerWidth >= 1000;

  useEffect(() => {
    setTimeout(() => {
      setShowDivs(true);
      setTimeout(() => {
        setShowDivs2(true);
        setTimeout(() => {
          setMoveRight(true);
          setTimeout(() => {
            setMoveLeft(true);
          }, 60);
        }, 500);
      }, 500);
    }, 150);
  }, []);

  const sendLogin = async () => {
    event.preventDefault();
    const response = await fetch(store.backendurl + "login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_name", data.user_name);
      localStorage.setItem("email", email);
      await actions.syncuser();
      setTimeout(() => {
        setMoveOut(true);
        setTimeout(() => {
          navigate("/");
        }, 400);
      }, 40);
    } else {
      setCredentialsError(true);
    }
  };

  return (
    <div className="d-flex flex-column  minheight">
      {isDesktop ? (
        <div
          className={` row col-11 col-xxl-8 col-xl-9 col-lg-10 mx-auto margintoplogin divpadre ${
            moveOut ? "slide-right-padre" : ""
          }`}
        >
          <div
            className={`"row col-6 video-login imagenn bordecitoall ${
              moveLeft ? "slide-left-video " : "opacity-video"
            } ${showDivs2 ? " slide-in " : " hidden"}`}
            style={{
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/qAu4wDftpwE?controls=0&start=246&autoplay=1&mute=1&loop=1&playsinline=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              style={{
                pointerEvents: "none",
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
          <div
            className={`bordecitoall col-4 row mx-auto my-5 imagenn margin-login ${
              moveRight ? "slide-right-login " : ""
            } ${showDivs ? " slide-in " : " hidden"}`}
          >
            <div className="login-box col-11 mx-auto mt-3">
              <p className="col-12 mx-auto sizehomet">OnBikes</p>
              <form
                onSubmit={() => {
                  e.prevent.default();
                }}
              >
                <div className="user-box sizehomes">
                  <input
                    type="email"
                    name="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setCredentialsError(false);
                      setEmail(e.target.value);
                    }}
                  />
                  <label className="" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="user-box sizehomes">
                  <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setCredentialsError(false);
                      setPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                {credentialserror ? (
                  <p className="m-auto text-danger">
                    *El email y/o la contraseña son incorrectos.
                  </p>
                ) : null}
                <div className="center-align">
                  <button
                    className="botonaco mx-auto mb-3 p-2 sizehomes px-3"
                    onClick={() => sendLogin()}
                  >
                    <span style={{ "--i": 1 }}>I</span>
                    <span style={{ "--i": 2 }}>n</span>
                    <span style={{ "--i": 3 }}>i</span>
                    <span style={{ "--i": 4 }}>c</span>
                    <span style={{ "--i": 5 }}>i</span>
                    <span style={{ "--i": 6 }}>a</span>
                    <span style={{ "--i": 7 }}>r</span>
                    <span style={{ "--i": 8 }}>&nbsp;</span>
                    <span style={{ "--i": 9 }}>s</span>
                    <span style={{ "--i": 10 }}>e</span>
                    <span style={{ "--i": 11 }}>s</span>
                    <span style={{ "--i": 12 }}>i</span>
                    <span style={{ "--i": 13 }}>ó</span>
                    <span style={{ "--i": 14 }}>n</span>
                  </button>
                </div>
              </form>
              <p className="center-align">
                ¿No tienes una cuenta aún?{" "}
                <Link to={"/userregister"} className="a2">
                  ¡Registrate!
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`bordecitoall col-10 mt-10 row mx-auto my-5 imagenn ${
              showDivs ? " slide-in " : " hidden"
            }`}
          >
            <div className="login-box col-11 mx-auto mt-3">
              <p className="col-12 mx-auto sizehomet">OnBikes</p>
              <form
                onSubmit={() => {
                  e.prevent.default();
                }}
              >
                <div className="user-box sizehomes">
                  <input
                    type="email"
                    name="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setCredentialsError(false);
                      setEmail(e.target.value);
                    }}
                  />
                  <label className="" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="user-box sizehomes">
                  <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setCredentialsError(false);
                      setPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                {credentialserror ? (
                  <p className="m-auto text-danger">
                    *El email y/o la contraseña son incorrectos.
                  </p>
                ) : null}
                <div className="center-align">
                  <button
                    className="botonaco mx-auto mb-3 p-2 sizehomes px-3"
                    onClick={() => sendLogin()}
                  >
                    <span style={{ "--i": 1 }}>I</span>
                    <span style={{ "--i": 2 }}>n</span>
                    <span style={{ "--i": 3 }}>i</span>
                    <span style={{ "--i": 4 }}>c</span>
                    <span style={{ "--i": 5 }}>i</span>
                    <span style={{ "--i": 6 }}>a</span>
                    <span style={{ "--i": 7 }}>r</span>
                    <span style={{ "--i": 8 }}>&nbsp;</span>
                    <span style={{ "--i": 9 }}>s</span>
                    <span style={{ "--i": 10 }}>e</span>
                    <span style={{ "--i": 11 }}>s</span>
                    <span style={{ "--i": 12 }}>i</span>
                    <span style={{ "--i": 13 }}>ó</span>
                    <span style={{ "--i": 14 }}>n</span>
                  </button>
                </div>
              </form>
              <p className="center-align">
                ¿No tienes una cuenta aún?{" "}
                <Link to={"/userregister"} className="a2">
                  ¡Registrate!
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
