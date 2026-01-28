import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import Testimonials from "./testimonials";
import { send } from "emailjs-com";

import React, { useState, useEffect } from "react";

const ContactDisplay = ({ display }) => {
  const [inputs, setInputs] = useState({});
  const [isSent, setIsSent] = useState(null);
  const [sendIconStyle, setSendIconStyle] = useState(
    "contact-form-send-icon__inactive"
  );
  const [emailStyle, setEmailStyle] = useState("contact-form-input");

  const { facebook, twitter, linkedin, github } = display.socialMedia;
  const { phone } = display.contact;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const valueCheck = () => {
    const isSearchValid =
      inputs.reply_to.search("@") !== -1 &&
      inputs.reply_to.search(".com") !== -1;
    isSearchValid
      ? setEmailStyle("contact-form-input")
      : setEmailStyle("contact-form-input__error");
    isSearchValid && inputs.from_name && inputs.message
      ? setSendIconStyle("contact-form-send-icon__active")
      : setSendIconStyle("contact-form-send-icon__inactive");
  };

  useEffect(() => {
    if (inputs.reply_to) valueCheck();
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    send("service_3606hpn", "template_3r6vkvj", inputs, "UVrVBKZC9JNV8p9iS")
      .then((response) => {
        setIsSent(true);
        // console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        setIsSent(false);
        // console.log('FAILED...', err);
      });
  };

  return (<React.Fragment>
    <img src={display.image} className="contact-image" alt={display.name} />
    <div className="infoWindow-wrapper">
      
      <div className="contact-title">
        <div className="contact-title__t1">Interested in</div>
        <div className="contact-title__t2">Working with me?</div>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        {isSent !== null ? (
          <div className="contact-form-notification">
            {isSent ? "Email successfully sent" : null}
            {!isSent ? "An Error occur please try again" : null}
            <div
              onClick={() => setIsSent(null)}
              className="contact-form-notification__exit"
            >
              Exit
            </div>
          </div>
        ) : null}
        <span>Send me an email</span>
        <div className="contact-form-input-container">
          <input
            type="text"
            value={inputs.from_name || "Name"}
            name="from_name"
            onChange={handleChange}
            className="contact-form-input"
            onClick={(e) => {
              e.target.focus();
              e.target.select();
            }}
            style={{ marginRight: "8px" }}
          />
          <input
            type="text"
            value={inputs.reply_to || "Email"}
            name="reply_to"
            onChange={handleChange}
            className={emailStyle}
            onClick={(e) => {
              e.target.focus();
              e.target.select();
            }}
          />
        </div>
        <textarea
          value={inputs.message || "Message"}
          name="message"
          onChange={handleChange}
          className="contact-form-textarea"
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <ForwardToInboxIcon
          type="submit"
          onClick={handleSubmit}
          className={sendIconStyle}
        />
      </form>
      <div className="contact-info">
        <div className="contact-info__phone">
          <PhoneIphoneIcon />
          {phone}
        </div>
        <div className="contact-info__social">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
        </div>
      </div>
      <Testimonials/>

    </div>
    </React.Fragment>
  );
};

export default ContactDisplay;
