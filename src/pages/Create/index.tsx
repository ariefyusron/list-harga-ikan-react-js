/* eslint-disable camelcase */
import React, { useMemo, useEffect, useCallback } from "react";
import JsonToForm from "json-reactform";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

import "./styles.scss";
import { TopBar } from "../../components";
import { getArea, getSize, postData } from "../../redux/actions";
import { Reducers } from "../../redux/types";
import { documentTitle } from "../../utils";

const Component = () => {
  documentTitle("Add Data");
  const dispatch = useDispatch();
  const history = useHistory();

  const homeState = useSelector((state: Reducers) => state.home);

  const _convertToOptionSelect = useCallback(
    (list: any[], label: string, value: string) => {
      let result: { label: string; value: string }[] = [];
      list.forEach((e) => {
        result = [...result, { label: e[label], value: e[value] }];
      });

      return result;
    },
    []
  );

  const _convertToOptionArea = useCallback(() => {
    let result: { label: string; value: string[] }[] = [];
    homeState.area.list.forEach((e) => {
      result = [
        ...result,
        { label: `${e.province} - ${e.city}`, value: [e.province, e.city] },
      ];
    });

    return result;
  }, [homeState.area.list]);

  const listForm = useMemo(
    () => ({
      komoditas: {
        type: "text",
        required: true,
      },
      area: {
        type: "select",
        required: true,
        options: _convertToOptionArea(),
      },
      size: {
        type: "select",
        required: true,
        options: _convertToOptionSelect(homeState.size.list, "size", "size"),
      },
      price: {
        type: "number",
        required: true,
      },
      tgl_parsed: {
        type: "date",
        required: true,
      },
      Add: {
        type: "submit",
        disabled: false,
      },
    }),
    [_convertToOptionSelect, _convertToOptionArea, homeState.size.list]
  );

  useEffect(() => {
    dispatch(getArea());
    dispatch(getSize());
  }, [dispatch]);

  const _handleSubmit = useCallback(
    (form: any) => {
      const body = {
        ...form,
        area_provinsi: form.area.value[0],
        area_kota: form.area.value[1],
        size: form.size.value,
      };
      delete body.area;

      dispatch(postData(body, () => history.goBack()));
    },
    [dispatch, history]
  );

  return (
    <>
      <TopBar title="Add Data" />
      <div className="page-create">
        <div className="content">
          {!homeState.area.isLoading &&
          !homeState.size.isLoading &&
          !homeState.isLoadingCreate ? (
            <JsonToForm model={listForm} onSubmit={_handleSubmit} />
          ) : (
            <Skeleton height={60} count={5} style={{ margin: "16px 0" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Component;
