import React, { useEffect, useState } from "react";
import { Form, Formik, useField } from "formik";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    position: "relative",
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 600,
      width: "100%",
    },
    "& .MuiTypography-h6": {},
  },
  formRoot: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    [theme.breakpoints.up("xl")]: {},
  },
  fontBold: {},
  pointer: {
    cursor: "pointer",
  },
  textareaAutosizeRoot: {
    width: "100%",
    border: "0 none",

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  scrollRoot: {
    height: 150,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const AddPoke = (props) => {
  const { open, close, pokemonState, pokemonName } = props;
  const [isShowChip, onShowChip] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isStat, setIsStat] = useState([]);
  const [isPict, setIsPict] = useState([]);
  const pokeData = pokemonState.data[pokemonName];
  const history = useHistory();

  const handleBlur = (to) => {
    if (to !== "") {
      onShowChip(true);
    }
  };
  const getStatus = () => {
    var o = pokeData.stats;
    var arr = [];
    var arrPict = [];

    for (var i = 0; i < o.length; i++) {
      arr.push(o[i].base_stat);
    }
    arrPict.push(
      pokeData.sprites.back_shiny,
      pokeData.sprites.front_shiny,
      pokeData.sprites.back_default,
      pokeData.sprites.front_default
    );
    setIsPict(arrPict);
    setIsStat(arr);
  };

  const savePokeData = (data) => {
    // console.log(data.name);

    const res = axios.post("http://localhost:5000/myapp", {
      name: data.name,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
      special_attack: data.special_attack,
      special_defense: data.special_defense,
      speed: data.speed,
      picture: data.picture,
    });
    res.then((response) => {
      console.log(response);
    });
    res.catch((err) => {
      console.log(err);
    });
    props.close();
  };

  useEffect(() => {
    getStatus();
  }, []);

  const classes = useStyles(props);

  return (
    <Dialog
      open={open}
      onClose={() => close()}
      aria-labelledby="simple-modal-title"
      TransitionComponent={Transition}
      aria-describedby="simple-modal-description"
      className={classes.dialogBox}
    >
      <Formik
        initialValues={{
          name: pokemonName,
          hp: isStat[0],
          attack: isStat[1],
          defense: isStat[2],
          special_attack: isStat[3],
          special_defense: isStat[4],
          speed: isStat[5],
          picture: isPict,
        }}
        onSubmit={(data) => {
          //   console.log(data);
          //   setIsSubmit(true);
          savePokeData(data);

          //   if (props.type === "create") {
          //     saveAlokasi(data.name,);
          //   } else if (props.type === "update") {
          //     updatealokasi(data.name);
          //   } else {
          //     showMessage("Not Selected Type", "danger");
          //   }
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <>
            {isSubmit ? <LinearProgress color="primary" /> : null}
            <Form className={classes.formRoot} noValidate autoComplete="off">
              <Box px={8} flex={1}>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            Rename
                          </InputAdornment>
                        ),
                      }}
                      name="name"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            Hp
                          </InputAdornment>
                        ),
                      }}
                      name="hp"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            Attack
                          </InputAdornment>
                        ),
                      }}
                      name="attack"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            Defense
                          </InputAdornment>
                        ),
                      }}
                      name="defense"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            special_attack
                          </InputAdornment>
                        ),
                      }}
                      name="special_attack"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            special_defense
                          </InputAdornment>
                        ),
                      }}
                      name="special_defense"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            speed
                          </InputAdornment>
                        ),
                      }}
                      name="speed"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box px={8} flex={1} hidden>
                <Box display="flex" alignItems="center">
                  {!isShowChip ? (
                    <MyTextField
                      disabled={isSubmit}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.fontBold}
                          >
                            picture
                          </InputAdornment>
                        ),
                      }}
                      name="picture"
                      onBlur={() => handleBlur(values.to)}
                    />
                  ) : (
                    <Chip label={values.to} variant="outlined" />
                  )}
                </Box>
              </Box>
              <Box
                py={2}
                px={8}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
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
              </Box>
              <Box py={2} px={8} flexDirection="row" alignItems="center">
                {pokeData.stats.map((row, i) => {
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
                      <p>{Object.entries(row.base_stat)}</p>
                    </>
                  );
                })}
              </Box>
              <Box px={8} py={4} bgcolor="grey.300">
                <Button
                  className={classes.btnRoot}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmit}
                >
                  SEND MY BAG
                </Button>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddPoke;
