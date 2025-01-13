import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <nav>
        <input type="text" id="searchInput" placeholder="Search events..." />
        <button><i className="fas fa-search"></i></button>
      </nav>
    </div>
  );
};

export default SearchBar;
