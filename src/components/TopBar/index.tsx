import React, { memo } from "react";

import "./styles.scss";
import { ICONS } from "../../configs";

interface Props {
  type?: "default" | "home";
  title?: String;
}

const Component = ({ type, title }: Props) => (
  <>
    <div className="component-topbar">
      <div className="wrap-topbar">
        {type === "home" ? (
          <img className="logo" src={ICONS.logo} alt="logo" />
        ) : (
          <>
            <button className="button-back">
              <img
                className="icon-back"
                src={ICONS.arrowBack}
                alt="arrow-back"
              />
            </button>
            <h1 className="title">{title}</h1>
          </>
        )}
      </div>
    </div>
    <div style={{ height: 60 }} />
  </>
);

Component.defaultProps = {
  type: "default",
  title: "",
};

export default memo(Component);
