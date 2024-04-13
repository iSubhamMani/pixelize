import { useEffect } from "react";
import SearchResult from "../components/SearchResult";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setSearchQuery,
  setSearchResults,
} from "../redux/slices/searchSlice";

const Search = () => {
  const { searchQuery, searchResults, error } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === "" || !searchQuery) {
      dispatch(setSearchResults([]));
      dispatch(setError(null));
      return;
    }
    const timer = setTimeout(() => {
      // get search results
      getSearchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchResults = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `/api/v1/search/get-search-results?q=${searchQuery}`
      );

      if (response?.data?.data?.length !== 0) {
        dispatch(setError(null));
        dispatch(setSearchResults(response?.data?.data));
      } else {
        dispatch(setError("No users found"));
        dispatch(setSearchResults([]));
      }
    } catch (error) {
      if (
        error.response?.data?.status === 400 &&
        error.response?.data?.message === "Search query is required"
      ) {
        dispatch(setError(null));
        dispatch(setSearchResults([]));
      } else {
        dispatch(setError("Something went wrong"));
        dispatch(setSearchResults([]));
      }
    }
  };

  return (
    <div className="px-4 py-6 flex-1 flex flex-col items-center">
      <div className="w-full max-w-[600px]">
        <input
          className="outline-none shadow-md w-full px-6 py-3 bg-secondary-clr rounded-full text-text-clr-1"
          type="text"
          value={searchQuery}
          placeholder="Search pixelizers"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
      {error && (
        <div className="my-4">
          <p className="text-text-clr-4 text-center">{error}</p>
        </div>
      )}
      <div className="w-full flex flex-col items-center my-6 gap-6">
        {searchResults.map((result) => {
          return <SearchResult key={result._id} userDetails={result} />;
        })}
      </div>
    </div>
  );
};

export default Search;
