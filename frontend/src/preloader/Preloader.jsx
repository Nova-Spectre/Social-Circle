import React, { useEffect } from "react";
import { preLoaderAnim } from "./PreLoaderAnim";
import { useTheme } from "@emotion/react";
import "./preloader.css";

const PreLoader = () => {
  const theme = useTheme();
  useEffect(() => {
    preLoaderAnim();
  }, []);

  const backgroundColor =
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.background.alt;
  const textColor =
    theme.palette.mode === "dark"
      ? "#FFFFFF"
      : theme.palette.primary.dark;

  return (
    <div
      className="preloader"
      style={{ background: backgroundColor, color: textColor }}
    >
      <img src="/src/assets/output.png" alt="Logo" className="logo" />
      <h1 className="app-name">SocialCircle</h1>
      <div className="texts-container">
        <p className="description">A Social App for Connected Souls.</p>
      </div>
    </div>
  );
};

export default PreLoader;
