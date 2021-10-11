import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./styles.scss";
import { TopBar, InfiniteScroll } from "../../components";
import { documentTitle } from "../../utils";
import { getData } from "../../redux/actions";
import { Reducers } from "../../redux/types";

const Component = () => {
  documentTitle("Home");
  const dispatch = useDispatch();
  const homeState = useSelector((state: Reducers) => state.home);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const _formatCurrency = useCallback(
    (value: Number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(value)),
    []
  );

  return (
    <>
      <TopBar type="home" />
      <div className="page-home">
        {homeState.isLoading && homeState.list.length === 0 ? (
          <Skeleton count={8} height={100} style={{ margin: "16px 0" }} />
        ) : (
          <InfiniteScroll
            onEndReached={() =>
              !homeState.isLoading &&
              homeState.loadMore &&
              dispatch(getData(true))
            }
          >
            {homeState.list.map((item, index) => (
              <div key={index} className="wrap-item">
                <div className="title">{item.komoditas}</div>
                <div className="wrap-desc">
                  <div className="desc">{`Tgl parsed: ${item.tgl_parsed}`}</div>
                  <div className="desc">{`${item.area_kota}, ${item.area_provinsi}`}</div>
                </div>
                <div className="wrap-price">
                  <div>
                    <div className="title">Size</div>
                    <div className="desc">{item.size}</div>
                  </div>
                  <div>
                    <div className="title">Harga</div>
                    <div className="desc">
                      {item.price && _formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {homeState.loadMore && (
              <Skeleton height={100} style={{ margin: "16px 0" }} />
            )}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Component;
