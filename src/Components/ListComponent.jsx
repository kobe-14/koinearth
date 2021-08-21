import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: 15,
  },
  description: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  details: {
    display: "flex",
    alignItems: "center",
  },
  detailedInfo: {
    marginLeft: 15,
  },
  informationSection: {
    marginTop: 10,
  },
  title: {
    cursor: "pointer",
    "&:hover": {
      color: "blue",
    },
  },
}));

const ListComponent = ({
  title,
  body,
  baseBranch,
  authorBranch,
  avatar,
  author,
  createdOn,
  reviewers,
  labels,
  prNumber,
}) => {
  const classes = useStyles();

  /**
   * To open PR in a new tab
   */
  const openIssue = () => {
    window.open(`https://github.com/neovim/neovim/pull/${prNumber}`, "_blank");
  };

  return (
    <Card className={classes.cardRoot}>
      <CardHeader
        title={
          <div onClick={openIssue} className={classes.title}>
            {title}
          </div>
        }
        subheader={`Authored by ${author}`}
        avatar={<Avatar src={avatar} />}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <div>
          <Typography variant="h6" className={classes.description}>
            Description:
          </Typography>
          <Typography>{!body ? "No description available" : body}</Typography>
        </div>
        <div className={classes.informationSection}>
          <Typography variant="h6" className={classes.description}>
            Reviewers:
          </Typography>
          <Typography>
            {reviewers.length === 0
              ? "No Reviewers Found"
              : reviewers.map((rev) => rev.login)}
          </Typography>
        </div>
        <div className={classes.informationSection}>
          <Typography variant="h6" className={classes.description}>
            Labels:
          </Typography>
          <div className={classes.flexContainer}>
            {labels.length > 0 ? (
              labels.map((label) => (
                <Chip
                  style={{
                    backgroundColor: `#${label.color}`,
                    marginRight: 5,
                    marginTop: 5,
                  }}
                  label={label.name}
                />
              ))
            ) : (
              <Typography>No Labels Found</Typography>
            )}
          </div>
        </div>
        <div className={classes.informationSection}>
          <Typography variant="h6" className={classes.description}>
            Other Details:
          </Typography>
          <div className={classes.flexContainer}>
            <div className={`${classes.details} ${classes.detailedInfo}`}>
              <AccountTreeIcon />
              <div className={classes.detailedInfo}>
                <Typography color="textSecondary">Base Branch:</Typography>
                <Typography>{baseBranch}</Typography>
              </div>
            </div>
            <div className={`${classes.details} ${classes.detailedInfo}`}>
              <AccountTreeIcon />
              <div className={classes.detailedInfo}>
                <Typography color="textSecondary">Author Branch:</Typography>
                <Typography>{authorBranch}</Typography>
              </div>
            </div>
            <div className={`${classes.details} ${classes.detailedInfo}`}>
              <EventIcon />
              <div className={classes.detailedInfo}>
                <Typography color="textSecondary">Created On:</Typography>
                <Typography>
                  {new Date(createdOn).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListComponent;
