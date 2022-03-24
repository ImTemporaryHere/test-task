import './reset.scss'
import './index.scss'
import React from 'react';
import HeaderNav from "./components/HeaderNav/HeaderNav";
import FiltersSection from "./components/FiltersSection/FiltersSection";
import Table from "./components/Table/Table";



const App = () => {



    return (
        <div>
          <HeaderNav/>
          <FiltersSection />
          <Table />
        </div>
    );
};

export default App;
