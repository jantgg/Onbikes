import React, { Component } from "react";
import "../../styles/login.css";
import "../../styles/forall.css";
import "../../styles/forall.css";

export const Footer = () => {
  const isDesktop = window.innerWidth >= 1000;
  return (
    <footer
      className={`bordecitot text-center myfoot mx-auto text-white mt-10${
        isDesktop ? " col-12" : " col-12"
      }`}
    >
      <div className="container p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating mx-2"
            style={{ border: "1px solid white", borderRadius: "0" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating mx-2"
            style={{ border: "1px solid white", borderRadius: "0" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating mx-2"
            style={{ border: "1px solid white", borderRadius: "0" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating mx-2"
            style={{ border: "1px solid white", borderRadius: "0" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating mx-2"
            style={{ border: "1px solid white", borderRadius: "0" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating mx-2"
            style={{ border: "1px solid white", borderRadius: "0" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>

        {/* <section className="">
        <form className="login-box">
          <div className="user-box sizehomes col-12 col-md-6 mx-auto">
            <input
              type="email"
              name="email"
              required
              autoFocus
              onChange={(e) => {}}
            />
            <label className="" htmlFor="email">
              Email
            </label>
          </div>
        </form>
      </section> */}

        <section className="mb-4 sizehomes">
          <p>
            Muchas gracias por visitar nuestra web, en OnBikes trabajamos a
            diario para ofrecer la mejor experiencia posible al usuario, si
            tienes alguna sugerencia o petición escribenos a:{" "}
            <u>onbikes@contact.es</u>
          </p>
        </section>

        {/* <section className="">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
      </div>

      <div className="text-center p-3">
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          OnBikes.es
        </a>
      </div>
    </footer>
  );
};
