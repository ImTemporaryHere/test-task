import './reset.scss'
import './index.scss'
import React from 'react';
import HeaderNav from "./components/HeaderNav/HeaderNav";
import FiltersSection from "./components/FiltersSection/FiltersSection";
import SearchSection from "./components/SearchSection/SearchSection";
import Table from "./components/Table/Table";



const App = () => {



    return (
        <div>
          <HeaderNav/>
          <FiltersSection />
          <SearchSection/>
          <Table />
        </div>
    );
};

export default App;
