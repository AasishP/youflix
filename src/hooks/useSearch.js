import { useContext } from "react";
import { SearchContext } from "../context/searchContext";

export default function useSearch() {
  const { searchOptions, setSearchOptions } = useContext(SearchContext);

  return [searchOptions, setSearchOptions];
}
