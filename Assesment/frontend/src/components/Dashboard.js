import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { MyGetPokemon } from "../actions/DashboardActions";
import _ from "lodash";

const Dashboard = (props) => {
  const idPokemon = props.match.params.id;
  const dispatch = useDispatch();
  const dashboardState = useSelector((state) => state.MyDashboard);
  const pokeData = dashboardState.data[idPokemon];
  //   const pokePict = pokeData.picture;
  useEffect(() => {
    dispatch(MyGetPokemon(idPokemon));
  }, []);
  //   console.log(dashboardState.data[idPokemon]);
  const showData = () => {
    if (!_.isEmpty(dashboardState.data[idPokemon])) {
      const pictures = JSON.parse(pokeData.picture);
      //   console.log(pokeData.picture[0]);
      return (
        <>
          <div className="test">
            {pictures.map((a) => {
              return (
                <div className="card">
                  <div className="card-image">
                    <img src={a} alt=""></img>
                  </div>
                </div>
              );
            })}

            {/* <div className="card">
                <div className="card-image">
                  <img src={pokeData.sprites.back_default} alt=""></img>
                </div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src={pokeData.sprites.front_shiny} alt=""></img>
                </div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src={pokeData.sprites.back_shiny} alt=""></img>
                </div>
              </div> */}
          </div>
          <div>
            {/* {pokeData.stats.map((row) => {
              return (
                <>
                  <Typography className={"pt-2"}>
                    {row.stat.name.toUpperCase()}
                  </Typography>
                  <progress
                    className="progress is-success"
                    value={row.base_stat}
                    max="100"
                  >
                    {row.base_stat}
                  </progress>
                </>
              );
            })} */}
          </div>
        </>
      );
    }
    if (dashboardState.loading) {
      return <Typography>Loading data</Typography>;
    }
    if (dashboardState.errorMsg !== "") {
      return <Typography>{dashboardState.errorMsg}</Typography>;
    }
    return <Typography>error load pokemon</Typography>;
  };

  return (
    <div>
      <Box display="flex">
        <NavLink to={"/"} style={{ margin: 10 }}>
          Back
        </NavLink>
      </Box>
      <Grid>{showData()}</Grid>
    </div>
  );
};

export default Dashboard;
