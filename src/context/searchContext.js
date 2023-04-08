import { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [searchOptions, setSearchOptions] = useState({
    queryTerm: "",
    page:1,
    genre: undefined,
    quality: undefined,
    sortBy: undefined,
    orderBy: undefined,
  });

  return (
    <SearchContext.Provider value={{ searchOptions, setSearchOptions }}>
      {children}
    </SearchContext.Provider>
  );
}
