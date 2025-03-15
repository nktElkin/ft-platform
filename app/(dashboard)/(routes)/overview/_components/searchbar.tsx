'use client';
import { useState } from "react";
import SearchLine from "./search";

const Searchbar = () => {
  const [loading, setLoading] = useState(false);

  const handleRequest = (query: string) => {
    // Handle the search request here
    console.log("Search query:", query);
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };


  return (
    <div className="top-0 sticky z-10 bg-background">
      <div className="max-w-xl mx-auto flex flex-row items-center justify-around">
        <SearchLine onRequest={handleRequest} onLoading={handleLoading} />
      </div>
    </div>
  );
};

export default Searchbar;
