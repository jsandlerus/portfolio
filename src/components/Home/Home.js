import React, { useState } from "react";
import FireflyCanvas from "../Decorations/FireflyCanvas";
import RoundFog from "./RoundFog";
import PieDisplay from "./PieDisplay";
import MaxWindow from "./MaxWindow";
import TurbulentWater from "./TurbulentWater";
import Fog from "../Decorations/Fog";
import InfoWindow from "../InfoWindow/InfoWindow";
import BreadCrumbs from "./BreadCrumbs";
import MusicPlay from "./MusicPlay";
import HandcraftedBadge from "./HandcraftedBadge";
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import LoadPage from '../Landing/LoadPage';
import {isMobile} from 'react-device-detect';

import { useSelector, useDispatch } from "react-redux";

const getFullScreen = () => {
  return 1 >= window.outerHeight - window.innerHeight;
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [closeLoadPage, setCloseLoadPage] = useState(false)

  const [closeFrameTop, setCloseFrameTop] = useState(null);
  const [closeFrameBottom, setCloseFrameBottom] = useState(null);

  const { dataFlow, breadCrumbs, flatDataFlow } = useSelector((state) => state);
  const [display, setDisplay] = useState(dataFlow[0].items.map((item) => item));
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(getFullScreen());
  const dispatch = useDispatch();

  window.onbeforeunload = () => {return false;}

  const showWindow = (e) => {
    if (typeof e === "boolean") setIsWindowOpen(e);
    else if (e.name === currentDisplay.name && isWindowOpen){
      setIsWindowOpen(false);
    }
    else setCurrentDisplay(e, setIsWindowOpen(true));
  };

  const exitAlert = () => {
    setIsFullScreen(true);
  };


  const updateDisplay = (elem) => {
    const search = flatDataFlow
      .map((item) => (item.name === elem ? item : null))
      .filter((item) => item != null);
    const crumb = elem;
    if (breadCrumbs.indexOf(elem) > -1) {
      dispatch({ type: "DELETE_CRUMBS", crumb });
      showWindow(false);
    }
    dispatch({ type: "UPDATE_CRUMBS", crumb });
    setDisplay(search[0].items, setIsWindowOpen(false));
  };



  const closeFrames = () => {
    setCloseFrameTop({
        'animation': "closeFramesTop 4s linear",
        "animationFillMode": "forwards",
      },
      setCloseFrameBottom({
        'animation': "closeFramesBottom 4s linear",
        "animationFillMode": "forwards",
      })
    );
    setTimeout(() => {
      setCloseFrameTop({'display': "none"},
      setCloseFrameBottom({'display': "none"})
    )
    }, 4000);
    
    setTimeout(() => setIsLoaded(true), 3000);

    setTimeout(() => setCloseLoadPage(true), 2000);
  };


  return (
    <React.Fragment>
      {!isFullScreen && !isMobile ? <MaxWindow exitAlert={() => exitAlert()} /> : null}

      <div className="load-container">
      <div className="load-frame frame-top" style={closeFrameTop} />
        <div className="load-frame frame-bottom" style={closeFrameBottom} />

        {!closeLoadPage ? ( <LoadPage closeFrames={() => closeFrames()}/> ) : null}

        {!isLoaded ? null : (
          <div className="home-background">
            {/* fix wholesale */}
            {/* add audio-reactive wrapper to affect everything except InfoWindow and audio controlers */}
            {/* move all pictures to a database */}
            {/* convert using Nextjs && TypeScript*/}
            <Fog position={"back"} />
            <div className="forest-ground"/>
            <MusicPlay/>
            <BreadCrumbs setDisplay={(e) => updateDisplay(e)} breadCrumbs={breadCrumbs}/>
            <FireflyCanvas/>
            <div className="forest-trees"/>
            <TurbulentWater setIsWindowOpen={() => setIsWindowOpen(false)}/>
            <Fog position={"front"}/>
            <HandcraftedBadge />
            <div className="logo">
              <PieDisplay
                updateDisplay={(e) => updateDisplay(e)}
                showWindow={(e) => showWindow(e)}
                display={display}
              />
              <div className="logo-text" onClick={() => updateDisplay("Home")}>
                JS <br />
                DESIGNS
              </div>
              <RoundFog />
            </div>
            {isWindowOpen ? (
              // <ClickAwayListener onClickAway={() => setIsWindowOpen(false)}>
                <div>
                  <InfoWindow
                    display={currentDisplay}
                    showWindow={(e) => showWindow(e)}
                  />
                </div>
              //  </ClickAwayListener>
            ) : null}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
