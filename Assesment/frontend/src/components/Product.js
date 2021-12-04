import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/ProductActions";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddPoke from "./AddPoke";
import { Link, NavLink } from "react-router-dom";
import { Box } from "@material-ui/core";
const Product = (props) => {
  const pokemonName = props.match.params.name;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  const [btnload, setBtnload] = useState(false);
  const [catchTrue, setCatchTrue] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handlerClose = () => {
    setOpenModal(false);
  };
  const handleOpenAdd = () => {
    setOpenModal(true);
  };

  function cathcingPokemon() {
    const randomBool = Math.random() > 0.5 ? true : false;
    setCatchTrue(randomBool);
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const LoadingBtn = async () => {
    setBtnload(true);
    cathcingPokemon();
    await delay(5000);
    setBtnload(false);
    if (catchTrue === true) {
      handleOpenAdd();
    } else {
      alert("Sorry you dont lucky today, please try again!");
    }

    // console.log(catchTrue);
  };

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);
  const showData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <>
          <div className="test">
            <div className="card">
              <div className="card-image">
                <img src={pokeData.sprites.front_default} alt=""></img>
              </div>
            </div>
            <div className="card">
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
            </div>
          </div>
          <div>
            {pokeData.stats.map((row) => {
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
            })}
          </div>
        </>
      );
    }
    if (pokemonState.loading) {
      return <Typography>Loading data</Typography>;
    }
    if (pokemonState.errorMsg !== "") {
      return <Typography>{pokemonState.errorMsg}</Typography>;
    }
    return <Typography>error load pokemon</Typography>;
  };
  return (
    <>
      {btnload && (
        <progress className="progress is-small is-dark is-rounded" max="100">
          15%
        </progress>
      )}
      {openModal ? (
        <AddPoke
          open={openModal === true && pokemonName !== 0 ? openModal : false}
          close={handlerClose}
          isData={showData}
          pokemonName={pokemonName}
          pokemonState={pokemonState}
        />
      ) : null}
      <Box display="flex">
        <NavLink to={"/"} style={{ margin: 10 }}>
          Back
        </NavLink>
      </Box>
      <Grid>
        <Typography className="tag is-info is-large">
          {pokemonName.toUpperCase()}
        </Typography>
      </Grid>
      <Grid>{showData()}</Grid>
      <div className="button-catch">
        <button
          className="button button-is is-warning mt-4 is-large is-centered is-rounded"
          onClick={LoadingBtn}
          disabled={btnload}
        >
          <b>CATCHING POKE</b>
        </button>
      </div>
    </>
  );
};

export default Product;
