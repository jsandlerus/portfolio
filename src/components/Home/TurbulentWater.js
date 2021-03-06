import React from "react";
const TurbulentWater = ({setIsWindowOpen}) => {
  return (
    <React.Fragment>
      <div className="swamp">
      
        <div className="swamp-water"> <div className="moon"/></div>
      </div>
      <div className="swamp-darkness" onClick={() => setIsWindowOpen(false)}/>
      <svg>
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="sea-filter"
            numOctaves="6"
            seed="10"
            baseFrequency="0.02 0.05"
          ></feTurbulence>
          <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="180s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
    </React.Fragment>
  );
};

export default TurbulentWater;
