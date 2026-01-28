import { useSpeechSynthesis } from "react-speech-kit";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DownloadIcon from '@mui/icons-material/Download';
import resume from '../../resources/JonathanSandlerResume.pdf';
import React from "react";

const AboutDisplay = ({ display }) => {
  // const onEnd = () => setIsVoicePlaying(false)
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    // onEnd,
  });

  const voice = voices[11];

  const text = "Hello, this is a test";

  return (
    <div className="about-wrapper">
      {/* {!supported ? <VolumeOffIcon /> : null}
      {supported && speaking ? (
        <VolumeOffIcon onClick={() => speak({ text, voice })} />
      ) : (
        <VolumeUpIcon onClick={() => cancel} />
      )} */}
      <div className="about-title"> About</div>
      {display.title && <div className="about-subtitle">{display.title}</div>}
      <div className="about-description">{display.description}</div>
        {display.education && (
          <div className="about-education">
            <div className="about-education-title">Education:</div>
            {display.education.map((edu) => (
              <div key={edu.name} className="about-education-item">
                <strong>{edu.name}</strong> - {edu.location}<br/>
                <span>{edu.description}</span><br/>
                <span className="about-education-period">{edu.period}</span>
              </div>
            ))}
          </div>
        )}
        <div className="infoWindow-techStack-resume-container">
        <a href={resume} download="JonathanSandlerResume.pdf" className="about-resume">Download my Resume <DownloadIcon/></a>
        </div>
        <div className="infoWindow-techStack-container">
        {display.techStack.map(key => (
          <div key={key.name}>
            {key.name+':'} <br/>
          {key.tech.map(tech =>(
          <img src={tech} alt={tech} key={tech} className="infoWindow-techStack-container-img"/>
          ))}
            </div>
        ))}
        </div>
    </div>
  );
};

export default AboutDisplay;
