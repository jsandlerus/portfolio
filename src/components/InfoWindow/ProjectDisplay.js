import React, {useEffect, useState} from 'react';
import { useSpeechSynthesis } from "react-speech-kit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Carousel, {CarouselItem} from "./Carousel";
import { useSelector} from "react-redux";
import {isMobile} from 'react-device-detect';


const ProjectDisplay = ({ display }) => {
  const [currentDisplay, setCurrentDisplay] = useState(display)
  const { breadCrumbs, flatDataFlow } = useSelector((state) => state);
  const lastCrumb = breadCrumbs[breadCrumbs.length - 1]


  useEffect(()=> {
    setCurrentDisplay(display);
  }, [display])

  // const onEnd = () => setIsVoicePlaying(false)
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    // onEnd,
  });
  const {images, github, viewLink} = currentDisplay

  const getParent = () =>{
    return flatDataFlow.map(item => {return(item.name === lastCrumb ? item.items : null)})
    .filter(item => item != null)
  }

  const updateDisplay = (flow) => {
    const parent = getParent()
    const positionInParent = parent[0].findIndex(item => item.name === currentDisplay.name)

    if (flow === 'previous' && positionInParent - 1 >= 0) setCurrentDisplay(parent[0][positionInParent - 1])
    else if (flow === 'previous') setCurrentDisplay(parent[0][parent[0].length - 1])
    else if (flow === 'next' && positionInParent + 1 < parent[0].length) setCurrentDisplay(parent[0][positionInParent + 1])
    else setCurrentDisplay(parent[0][0])
  };

  // Format name for display (remove \n)
  const displayName = currentDisplay.name ? currentDisplay.name.replace(/\n/g, ' ') : '';

  return (
    <div className="infoWindow-wrapper">
      {/* Project/Company Header */}
      <div className="infoWindow-header">
        <h2 className="infoWindow-title">{displayName}</h2>
        <div className="infoWindow-header-links">
          {viewLink && (
            <a href={viewLink} target="_blank" rel="noopener noreferrer" className="infoWindow-link" title="View Live">
              <LaunchIcon />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="infoWindow-link" title="View Code">
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Role & Period Badge */}
      {(currentDisplay.role || currentDisplay.period) && (
        <div className="infoWindow-meta">
          {currentDisplay.role && (
            <div className="infoWindow-meta-item">
              <WorkIcon />
              <span>{currentDisplay.role}</span>
            </div>
          )}
          {currentDisplay.period && (
            <div className="infoWindow-meta-item">
              <CalendarTodayIcon />
              <span>{currentDisplay.period}</span>
            </div>
          )}
        </div>
      )}

      {/* Content with Image and Description */}
      <div className="infoWindow-content">
        {/* Image Carousel - floated left */}
        <div className="infoWindow-carousel-float">
          <Carousel props ={{images, github, viewLink, name:currentDisplay.name}}>
            {images.map(img => <CarouselItem img={img} alt={img} key={img}/>)}
          </Carousel>
        </div>

        {/* Description */}
        <div className="infoWindow-description">
          {currentDisplay.description}
        </div>
      </div>

      {/* Tech Stack - at bottom with frosting effect */}
      {currentDisplay.techStack !== undefined ? (
        <div className="infoWindow-techStack-wrapper infoWindow-techStack-frosted">
          <div className="infoWindow-techStack-label">Tech Stack</div>
          <div className="infoWindow-techStack">
            {currentDisplay.techStack.map((tech) => (
              <img src={tech} alt={tech} key={tech}/>
            ))}
          </div>
        </div>
      ) : null}

      {/* Navigation Buttons */}
      <div className={isMobile ? "infoWindow-button_mobile" : "infoWindow-button"}>
        <div onClick={() => updateDisplay('previous')}>
          <ArrowBackIcon/>
          {"Previous"}
        </div>
        <div onClick={() => updateDisplay('next')}>
          {"Next"}
          <ArrowForwardIcon  />
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
