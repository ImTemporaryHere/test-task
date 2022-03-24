import React from 'react';
import HeaderNav from "./components/HeaderNav/HeaderNav";
import './reset.scss'
import './index.scss'
import FiltersSection from "./components/FiltersSection/FiltersSection";
import SearchSection from "./components/SearchSection/SearchSection";


const App = () => {

    return (
        <div>
          <HeaderNav/>
          <FiltersSection />
          <SearchSection/>
        </div>
    );
};

export default App;
