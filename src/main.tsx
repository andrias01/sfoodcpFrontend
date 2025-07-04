// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DashboardContextProvider } from './context/DashboardContext';
import { CartaActualProviderWrapper } from './context/CartaActualContext';
import { MateriaPrimaProviderWrapper } from './context/MateriaPrimaContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MateriaPrimaProviderWrapper>
    <CartaActualProviderWrapper>
      <DashboardContextProvider>
        <Suspense>
          <App />
        </Suspense>
      </DashboardContextProvider>
    </CartaActualProviderWrapper>
  </MateriaPrimaProviderWrapper>
);
