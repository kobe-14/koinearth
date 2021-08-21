import axios from "axios";
import { useEffect, useState } from "react";

const useGetPrs = (page, prType, sort) => {
  const [prs, setPrs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Side effect to clear the PR array if prType or sort changed
   */
  useEffect(() => {
    setPrs([]);
  }, [sort, prType]);

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/neovim/neovim/pulls", {
        params: {
          page,
          state: prType === "" ? undefined : prType,
          sort: sort === "" ? undefined : sort,
        },
      })
      .then((res) => {
        //since page_size is 30 if the response length is less than 30 setting hasMore to false to diplay a text instead of loader
        if (res.data.length < 30) {
          setHasMore(false);
        }
        setPrs((prevPrs) => [...prevPrs, ...res.data]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page, prType, sort]);

  return { prs, hasMore };
};

export default useGetPrs;
