import React from 'react';

import Card from './components/Card';
import GlobalStore from './state/store';

const App = () => {
  return (
    <GlobalStore.Provider>
      <Card></Card>
    </GlobalStore.Provider>
  );
};

export default App;
