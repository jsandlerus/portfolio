import React from "react";

const PieDisplay = ({ showWindow, display, updateDisplay }) => {
  const getPieStyle = (index) => {
    let pieButtonStyle = {
      "--rotX": "",
      "--skewY": "",
      "--scale": "1",
      "--rotY": "",
    };
    const rotX = (360 / display.length) * index;
    const skewY = 5 * display.length * -1;
    if (display.length === 3) {
      pieButtonStyle["--skewY"] = `30deg`;
      pieButtonStyle["--scale"] = `1.2`;
    } else if (display.length === 4) pieButtonStyle["--skewY"] = `0deg`;
    else if (display.length === 5) pieButtonStyle["--skewY"] = `-19deg`;
    else if (display.length > 5) pieButtonStyle["--skewY"] = `${skewY}deg`;

    pieButtonStyle["--rotX"] = `${rotX}deg`;

    return pieButtonStyle;
  };

  const getPieWrapperTextStyle = () => {
    let pieButtonStyle = {
      "--rotX": "",
      "--skewY": "",
      "--scale": "1",
      "--rotY": "",
    };
    const skewY = 5 * display.length;
    const rotX = 30 / (skewY / 30);
    if (display.length === 3) {
      pieButtonStyle["--rotX"] = `60deg`;
      pieButtonStyle["--skewY"] = `-30deg`;
      pieButtonStyle["--scale"] = `0.8`;
    } else if (display.length === 4) {
      pieButtonStyle["--rotX"] = `45deg`;
      pieButtonStyle["--skewY"] = `0deg`;
    } else if (display.length === 5) {
      pieButtonStyle["--rotX"] = `32deg`;
      pieButtonStyle["--skewY"] = `20deg`;
    } else if (display.length > 5) {
      pieButtonStyle["--rotX"] = `${rotX}deg`;
      pieButtonStyle["--skewY"] = `${skewY}deg`;
    }
    return pieButtonStyle;
  };

  const getPieTextStyle = (index) => {
    let pieButtonStyle = {
      "--scale": "",
      "marginRight":"0"
    };
    const rotX = (360 / display.length) * index;
    pieButtonStyle["--scale"] = rotX >= 60 && rotX <= 210 ? "-1,-1" : "1";
    if(display.length === 3) pieButtonStyle["marginRight"] = `60px`;

    return pieButtonStyle;
  };

  let i = -1;

  return (
    <div className="pie-parent">
      {display.map((elem) => 
      (
        <div
          className="pie-button"
          style={getPieStyle((i += 1))}
          key={elem.name}
          onClick={
            elem.items ? () => updateDisplay(elem.name) : () => showWindow(elem)
          }
        >
          <div className="pie-button-loading" style={getPieWrapperTextStyle()}/>
          <div className="pie-button-wrapper-text" style={getPieWrapperTextStyle()}>
            <pre className="pie-button-text" style={getPieTextStyle((i))}>{elem.name}</pre>
          </div>
        </div>
      )
      )}
    </div>
  );
};

export default PieDisplay;
