import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import "../../styles/forall.css";
import { useNavigate } from "react-router-dom";

export const PhotographerRegister = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [user_name, setUserName] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [findMe, setFindMe] = useState("");
  const [services, setServices] = useState("");
  const [credentialsError, setCredentialsError] = useState(false);
  const [errorUser, setErrorUser] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [inputClickedUser, setInputClickedUser] = useState(false);
  const [inputClickedEmail, setInputClickedEmail] = useState(false);
  const [inputClickedPassword, setInputClickedPassword] = useState(false);

  useEffect(() => {
    areEqual();
  }, [confirmPassword]);

  const handleCheckbox = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const areEqual = () => {
    if (password == confirmPassword) {
      setPasswordError(false);
    } else setPasswordError(true);
  };

  const sendPhotographerRegister = async () => {
    const response = await fetch(store.backendurl + "photographerregister", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        email: email,
        password: password,
        confirmpassword: confirmPassword,
        location: location,
        instagram: instagram,
        findme: findMe,
        services: services,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/login");
    } else {
      const errorMessage = await response.json();
      if (
        errorMessage.response ==
        "The indicated username is already being used by another user or photographer"
      )
        setErrorUser(errorMessage.response);
      if (
        errorMessage.response ==
        "The indicated email is already being used by another user or photographer"
      )
        setErrorEmail(errorMessage.response);
      if (
        errorMessage.response ==
        "The entered password is different, please check the password"
      )
        setPasswordError(errorMessage.response);
    }
  };

  return (
    <div className="row">
      <div className="col-11 col-xxl-4 col-xl-5 col-lg-6 row mx-auto mb-5 text-white">
        <div className="center-align mx-auto sizehomet bordecitoall py-2 mt-3 imagenn sizehomeb spartan">
          <Link to={"/userregister"} className="link">
            Registrate como usuario
          </Link>
          &nbsp; para disfrutar de la mejor comunidad motera.
        </div>
        <div className="login-box col-12 mx-auto mt-3 bordecitoall imagenn px-5">
          <div className="bordecito mx-auto col-10 sizehomet center-align mb-5 mt-2 spartan">
            Registro de Fotógrafo
          </div>
          <div>
            <div className="user-box sizehomes">
              <input
                type="name"
                name="name"
                required
                autoFocus
                value={user_name}
                onChange={(e) => {
                  setErrorUser("");
                  setCredentialsError(false);
                  setUserName(e.target.value);
                }}
                onClick={() => {
                  setInputClickedUser(true);
                }}
                onBlur={() => {
                  setInputClickedUser(false);
                }}
              />
              <label htmlFor="name" className="row">
                <div className="col-2">Usuario &nbsp; </div>
                {inputClickedUser ? (
                  <div className="text-secondary col-10">
                    *Longitud entre 5 y 20 caracteres
                  </div>
                ) : null}
              </label>
              <div>
                {errorUser ==
                "The indicated username is already being used by another user or photographer" ? (
                  <p className="text-danger">*El nombre se encuentra en uso</p>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                type="email"
                name="email"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setErrorEmail("");
                  setEmail(e.target.value);
                  setCredentialsError(false);
                  setInputClickedEmail(true);
                }}
                onClick={() => {
                  setInputClickedEmail(true);
                }}
                onBlur={() => {
                  setInputClickedEmail(false);
                }}
              />
              <label htmlFor="name" className="row">
                <div className="col-2">Email &nbsp; &nbsp; &nbsp; </div>
                {inputClickedEmail ? (
                  <div className="text-secondary col-10">
                    *ejemplo@ejemplo.es
                  </div>
                ) : null}
              </label>
              <div>
                {errorEmail ==
                "The indicated email is already being used by another user or photographer" ? (
                  <p className="text-danger">
                    *El email indicado ya está siendo utilizado por otro usuario
                    o fotógrafo."
                  </p>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                name="password"
                required
                autoFocus
                type="password"
                value={password}
                onChange={(e) => {
                  setPasswordError(false);
                  setPassword(e.target.value);
                }}
                onClick={() => {
                  setInputClickedPassword(true);
                }}
                onBlur={() => {
                  setInputClickedPassword(false);
                }}
              />
              <label htmlFor="password" className="row">
                <div className="col-4">Contraseña</div>
                {inputClickedPassword ? (
                  <div className="text-secondary col-8">
                    *Ejemplo: Superhero@1
                  </div>
                ) : null}
              </label>
              <div>
                {passwordError ==
                "The entered password is different, please check the password" ? (
                  <>
                    <p className="text-danger">*Las contraseñas no coinciden</p>
                    <p className="text-secondary">
                      *Longitud minima de 8 caracteres, una mayúscula, un número
                      y un carácter especial: '! # $ % & * ? @'
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                name="password"
                required
                autoFocus
                className=""
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label htmlFor="confirm_password" className="row">
                <div className="col-12">Confirmar contraseña</div>
              </label>
              <div>
                {passwordError == true ? (
                  <p className="text-danger">
                    *Las contraseñas deben coincidir
                  </p>
                ) : null}
              </div>
            </div>
            <div className="user-box sizehomes">
              <input
                required
                autoFocus
                className=""
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <label htmlFor="text" className="row">
                <div className="col-12">Provincia</div>
              </label>
            </div>
            <div className="user-box sizehomes">
              <input
                required
                autoFocus
                className=""
                type="text"
                value={instagram}
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
              />
              <label htmlFor="text" className="row">
                <div className="col-12">Instagram</div>
              </label>
            </div>
            <div className="user-box sizehomes">
              <input
                required
                autoFocus
                className=""
                type="text"
                value={services}
                onChange={(e) => {
                  setServices(e.target.value);
                }}
              />
              <label htmlFor="text" className="row">
                <div className="col-12">Descripción del servicio</div>
              </label>
            </div>
            <div className="user-box sizehomes">
              <input
                required
                autoFocus
                className=""
                type="text"
                value={findMe}
                onChange={(e) => {
                  setFindMe(e.target.value);
                }}
              />
              <label htmlFor="text" className="row">
                <div className="col-12">Lugar de trabajo</div>
              </label>
            </div>
            <div className="sizehomes center-align mb-3">
              *Podrás subir fotos en tu perfil más adelante
            </div>
            <div className="sizehomes col-12 row mx-auto centrar mb-4">
              <label className="checkbox-btn">
                <label className="" htmlFor="checkbox">
                  Acepto los términos y condiciones.
                </label>
                <input
                  id="checkbox"
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={handleCheckbox}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="center-align sizehomes">
              <button
                className="botonaco px-4 py-1 text-white"
                onClick={() => {
                  if (!termsAccepted) {
                    alert("Por favor acepta los términos y condiciones.");
                    return;
                  }
                  if (passwordError == false) {
                    sendPhotographerRegister();
                  }
                }}
              >
                <span style={{ "--i": 1 }}>R</span>
                <span style={{ "--i": 2 }}>e</span>
                <span style={{ "--i": 3 }}>g</span>
                <span style={{ "--i": 4 }}>i</span>
                <span style={{ "--i": 5 }}>s</span>
                <span style={{ "--i": 6 }}>t</span>
                <span style={{ "--i": 7 }}>r</span>
                <span style={{ "--i": 8 }}>a</span>
                <span style={{ "--i": 9 }}>r</span>
                <span style={{ "--i": 10 }}>s</span>
                <span style={{ "--i": 11 }}>e</span>
              </button>
            </div>
            <div className="my-2 center-align">
              <Link className="link" to={"/login"}>
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
