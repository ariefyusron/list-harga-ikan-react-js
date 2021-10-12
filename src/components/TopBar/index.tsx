import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import "./styles.scss";
import { ICONS } from "../../configs";

interface Props {
  type?: "default" | "home";
  title?: String;
}

const Component = ({ type, title }: Props) => {
  const history = useHistory();

  return (
    <>
      <div className="component-topbar">
        <div className="wrap-topbar">
          {type === "home" ? (
            <div className="wrap-home">
              <img className="logo" src={ICONS.logo} alt="logo" />
              <button
                className="button-back"
                onClick={() => history.push("create")}
              >
                <img className="icon-back" src={ICONS.plus} alt="plus" />
              </button>
            </div>
          ) : (
            <>
              <button className="button-back" onClick={() => history.goBack()}>
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
};

Component.defaultProps = {
  type: "default",
  title: "",
};

export default memo(Component);
