import { useEffect, useState } from 'react';

import { findAll } from './services/restCountries';
import Filter from './components/Filter';
import Countries from './components/Countries';

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState(null);
  const [isActive, setIsActive] = useState({name: null, isActive: false});
  let countriesToShow;

  const filterHandler = event => {
    setFilter(event.target.value);
  }

  const showContentHandler = event => {
    setIsActive({name: event.target.value, isActive: !isActive.isActive});
  }

  useEffect(() => {
    findAll().then(response => setCountries(response));
  }, [])

  if(filter.length > 0) {
    countriesToShow = countries.filter(data => data.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div className="App">
      <Filter value={filter} onChange={filterHandler} />
      <Countries countriesList={countriesToShow} country={isActive} showContentHandler={showContentHandler} />
    </div>
  );
}

export default App;
