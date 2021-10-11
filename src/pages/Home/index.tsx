import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import "./styles.scss";
import { TopBar, InfiniteScroll } from "../../components";
import { documentTitle } from "../../utils";
import { getData } from "../../redux/actions";
import { Reducers } from "../../redux/types";

let runTimeOut: any;

const Component = () => {
  documentTitle("Home");
  const dispatch = useDispatch();
  const homeState = useSelector((state: Reducers) => state.home);
  const isFirst = useRef(true);

  const listFilter = useMemo(
    () => ["komoditas", "area_kota", "area_provinsi", "price"],
    []
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(listFilter[0]);

  const formatSearch = useMemo(
    () => (search ? `{"${filter}":"${search}"}` : ""),
    [filter, search]
  );

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      dispatch(getData(formatSearch));
    }
  }, [dispatch, isFirst, formatSearch]);

  const _formatCurrency = useCallback(
    (value: Number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(value)),
    []
  );

  const _handleSearch = useCallback(
    (value: string) => {
      clearTimeout(runTimeOut);
      setSearch(value);

      runTimeOut = setTimeout(() => {
        dispatch(getData(value ? `{"${filter}":"${value}"}` : ""));
      }, 1000);
    },
    [dispatch, filter]
  );

  const _handleFilter = useCallback(
    (value: string) => {
      clearTimeout(runTimeOut);
      setFilter(value);

      if (search) {
        dispatch(getData(`{"${value}":"${search}"}`));
      }
    },
    [dispatch, search]
  );

  return (
    <>
      <TopBar type="home" />
      <div className="page-home">
        <div className="wrap-search">
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => _handleSearch(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => _handleFilter(e.target.value)}
          >
            {listFilter.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="content-home">
          {homeState.isLoading && homeState.list.length === 0 ? (
            <Skeleton count={8} height={100} style={{ margin: "16px 0" }} />
          ) : (
            <InfiniteScroll
              onEndReached={() =>
                !homeState.isLoading &&
                homeState.loadMore &&
                dispatch(getData(formatSearch, true))
              }
              isEmpty={homeState.list.length === 0}
              emptyComponent={() => <div>Data Kosong</div>}
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
      </div>
    </>
  );
};

export default Component;
