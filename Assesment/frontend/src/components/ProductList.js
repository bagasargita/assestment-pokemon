import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { GetPokemonList } from "../actions/ProductActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ProductList = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };
  const showData = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            {pokemonList.data.map((arr) => {
              return (
                <tbody>
                  <tr key={arr.id}>
                    <td>{arr.name}</td>
                    <td>
                      <Link to={`/product/${arr.name}`}>View</Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      );
    }
    if (pokemonList.loading) {
      return <Typography>Loading data</Typography>;
    }
    if (pokemonList.errorMsg !== "") {
      return <Typography>{pokemonList.errorMsg}</Typography>;
    }

    return <Typography>unable to load data</Typography>;
  };
  return (
    <>
      <div className="column search-bar">
        <input
          className="input is-rounded"
          type="text"
          placeholder="Search.........."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="button is-primary flex-end is-rounded"
          onClick={() => props.history.push(`/product/${search}`)}
        >
          Search
        </button>
      </div>
      <div>{showData()}</div>
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={(data) => fetchData(data.selected + 1)}
          containerClassName="pagination"
        />
      )}
    </>
  );
};

export default ProductList;
