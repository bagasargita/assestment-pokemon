import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyPokemonList } from "../actions/DashboardActions";
import _ from "lodash";
import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const DashboardList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.MyDashboardList);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(MyPokemonList());
  };
  const showData = () => {
    if (!_.isEmpty(myList.data)) {
      return (
        <Grid container item xs={12} spacing={3}>
          {myList.data.map((arr) => {
            const myPicture = JSON.parse(arr.picture);
            return (
              <Grid item xs={4}>
                <div display="flex" align="center">
                  <Typography variant="h4" fontFamily="-apple-system">
                    {arr.name.toUpperCase()}
                  </Typography>
                </div>
                <Divider />
                <Paper className={classes.paper}>
                  {myPicture.map((p) => {
                    return <img src={p} alt="" />;
                  })}
                </Paper>
                <Paper className={classes.paper}>
                  <div display="flex" align="left">
                    <Typography>HP</Typography>
                  </div>
                  <progress
                    className="progress is-success"
                    value={arr.hp}
                    max="100"
                  />
                  <div display="flex" align="left">
                    <Typography>ATTACK</Typography>
                  </div>
                  <progress
                    className="progress is-success"
                    value={arr.attack}
                    max="100"
                  />
                  <div display="flex" align="left">
                    <Typography>DEFENSE</Typography>
                  </div>
                  <progress
                    className="progress is-success"
                    value={arr.defense}
                    max="100"
                  />
                  <div display="flex" align="left">
                    <Typography>SPEED</Typography>
                  </div>
                  <progress
                    className="progress is-success"
                    value={arr.speed}
                    max="100"
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      );
    }
    if (myList.loading) {
      return <Typography>Loading data</Typography>;
    }
    if (myList.errorMsg !== "") {
      return <Typography>{myList.errorMsg}</Typography>;
    }

    return <Typography>unable to load data</Typography>;
  };
  return (
    <div>
      <NavLink to={"/"} style={{ margin: 10 }}>
        Back
      </NavLink>

      {showData()}
    </div>
  );
};

export default DashboardList;
