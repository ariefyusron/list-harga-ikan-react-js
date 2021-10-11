import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./styles.scss";
import { TopBar } from "../../components";
import { documentTitle } from "../../utils";
import { getData } from "../../redux/actions";

const Component = () => {
  documentTitle("Home");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
      <TopBar type="home" />
    </>
  );
};

export default Component;
