import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./HandcraftedBadge.css";

const HandcraftedBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className={`handcrafted-badge ${isExpanded ? "expanded" : ""}`}>
      <div
        className="handcrafted-badge-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="handcrafted-title">100% Handcrafted Code</span>
        <div
          className="handcrafted-close"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
        >
          <CloseIcon />
        </div>
      </div>

      {isExpanded && (
        <div className="handcrafted-content">
          <div className="handcrafted-year">
            Built in 2022, <span className="handcrafted-pre-ai">Pre-AI Era</span>
          </div>
          <p className="handcrafted-description">
            <strong>This is not a video.</strong> Everything you see is rendered
            in real-time using pure code:
          </p>
          <ul className="handcrafted-list">
            <li>
              <span className="handcrafted-feature">Animated Water:</span>Made with SVG
              turbulence filters
            </li>
            <li>
              <span className="handcrafted-feature">Fireflies:</span> Made with Canvas
              particle system
            </li>
            <li>
              <span className="handcrafted-feature">Dynamic Fog:</span> Made with CSS
              animations & blend modes
            </li>
            <li>
              <span className="handcrafted-feature">Day/Night Cycle:</span> Made with CSS
              Layered opacity transitions
            </li>
            <li>
              <span className="handcrafted-feature">Glowing Effects:</span> Made with CSS
              Custom box-shadows & filters
            </li>
          </ul>
          <div className="handcrafted-footer">
            Built with React, Redux & JavaScript
            <br />
            <span className="handcrafted-note">
              60 FPS on mobile • Zero external animation libraries
            </span>
          </div>
        </div>
      )}

      {!isExpanded && (
        <div className="handcrafted-hint">Click to learn more</div>
      )}
    </div>
  );
};

export default HandcraftedBadge;
