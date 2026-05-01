import React from 'react';
import './ServerError.css';
import { useEffect } from 'react';
import ModalStore from '../../../context/ModalStore';
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
const navigate = useNavigate();
const { serverError } = ModalStore();

  useEffect(() => {
    if (!serverError) {
      navigate("/dashboard");
    }
  },[navigate, serverError]);

  return (
    <div className="server-error-container">
      <div className="server-error-content">
        <div id="ghost">
          <div id="red">
            <div id="pupil"></div>
            <div id="pupil1"></div>
            <div id="eye"></div>
            <div id="eye1"></div>
            <div id="top0"></div>
            <div id="top1"></div>
            <div id="top2"></div>
            <div id="top3"></div>
            <div id="top4"></div>
            <div id="st0"></div>
            <div id="st1"></div>
            <div id="st2"></div>
            <div id="st3"></div>
            <div id="st4"></div>
            <div id="st5"></div>
            <div id="an1"></div>
            <div id="an2"></div>
            <div id="an3"></div>
            <div id="an4"></div>
            <div id="an5"></div>
            <div id="an6"></div>
            <div id="an7"></div>
            <div id="an8"></div>
            <div id="an9"></div>
            <div id="an10"></div>
            <div id="an11"></div>
            <div id="an12"></div>
            <div id="an13"></div>
            <div id="an14"></div>
            <div id="an15"></div>
            <div id="an16"></div>
            <div id="an17"></div>
            <div id="an18"></div>
            <div id="mouthstart"></div>
            <div id="mouth1"></div>
            <div id="mouth2"></div>
            <div id="mouth3"></div>
            <div id="mouth4"></div>
            <div id="mouth5"></div>
            <div id="mouthend"></div>
          </div>
          <div id="shadow"></div>
        </div>
        <p className="server-error-text">Server Error</p>
        <a onClick={() => (window.location.href = "/login")} className="server-error-btn">Go back to Login</a>
      </div>
    </div>
  );
}

export default ServerError;
