import React from 'react'
import { Provider } from 'react-redux';

import Navigation from './Navigation/Navigation';
import Store from './Store/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react'

export default function App () {

  let persistor = persistStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}
