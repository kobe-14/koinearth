import React, { useEffect, useState, useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import useGetPrs from "../hooks/useGetPrs";
import ListComponent from "./ListComponent";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "./Shared/Loader/Loader";

const useStyles = makeStyles((theme) => ({
  filters: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
}));

const VirtuosoComponent = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  //Filter states
  const [prType, setPrType] = useState("");
  const [sort, setSort] = useState("");

  const { prs, hasMore } = useGetPrs(page, prType, sort); // a custom hook to fetch the data

  /**
   * function to be executed only when hasMore is true
   */
  const loadMoreData = useCallback(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  /**
   * Side Effect to set page number to 1 when filters value change
   */
  useEffect(() => {
    setPage(1);
  }, [prType, setPrType]);

  /**
   * onChange function set state of filters based on type
   * @param {Event} e
   * @param {String} type
   * @returns
   */
  const handleChange = (e, type) => {
    switch (type) {
      case "prType":
        setPrType(e.target.value);
        break;
      case "sort":
        setSort(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      {/**-------------------------------------------Filters Section---------------------------------------- */}
      <div className={classes.filters}>
        <Typography style={{ fontWeight: "bold" }}>
          Use these Filters for search for specific PR
        </Typography>
        <div style={{ display: "flex" }}>
          <div style={{ width: 100, margin: 20 }}>
            <TextField
              select
              label="PR Type"
              value={prType}
              onChange={(e) => handleChange(e, "prType")}
              fullWidth
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"open"}>Open</MenuItem>
              <MenuItem value={"closed"}>Closed</MenuItem>
            </TextField>
          </div>
          <div style={{ width: 100, margin: 20 }}>
            <TextField
              select
              label="Sort By"
              value={sort}
              onChange={(e) => handleChange(e, "sort")}
              fullWidth
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"created"}>Created</MenuItem>
              <MenuItem value={"updated"}>Updated</MenuItem>
              <MenuItem value={"popularity"}>Popularity</MenuItem>
            </TextField>
          </div>
        </div>
      </div>
      {/**-------------------------------------------End of Filters Section---------------------------------*/}
      <Virtuoso
        style={{ height: "calc(100vh - 132px)" }}
        data={prs}
        endReached={loadMoreData}
        overscan={200}
        components={{
          Footer: () => {
            return (
              <div
                style={{
                  padding: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {hasMore ? <Loader /> : "You have reached end of the list"}
              </div>
            );
          },
        }}
        itemContent={(index, pr) => {
          return (
            <ListComponent
              title={pr.title}
              avatar={pr.user.avatar_url}
              body={pr.body}
              author={pr.head.user.login}
              reviewers={pr.requested_reviewers}
              labels={pr.labels}
              baseBranch={pr.base.ref}
              authorBranch={pr.head.ref}
              createdOn={pr.created_at}
              prNumber={pr.number}
            />
          );
        }}
      />
    </>
  );
};

export default VirtuosoComponent;
