// import React from 'react';
import ReactDOM from 'react-dom/client';

import '@popperjs/core'; // Llamando a poppers
import 'bootstrap'; // Llamando al javascript de bootstrap

import './core/styles/app.scss';

import router from './core/router/index.tsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
);
