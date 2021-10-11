import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";
import { documentTitle } from "../../utils";
import { getSeasons, sampleAction } from "../../redux/actions";
import { Reducers } from "../../redux/types";

const Component = () => {
  documentTitle("Detail");
  const history = useHistory();
  const dispatch = useDispatch();
  const homeState = useSelector((state: Reducers) => state.home);

  useEffect(() => {
    dispatch(getSeasons());
  }, [dispatch]);

  const _count = useCallback(() => {
    dispatch(sampleAction());
  }, [dispatch]);

  const _backToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <div className="page-detail">
      <h1>Ini Detail</h1>
      <h2>{`Count ${homeState.count}`}</h2>

      <button type="button" onClick={_count}>
        <h2 className="link">Count</h2>
      </button>

      <button type="button" onClick={_backToHome}>
        <h2 className="link">Back to Home</h2>
      </button>
    </div>
  );
};

export default Component;
