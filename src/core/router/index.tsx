import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import Admin from '@/core/layouts/Admin';
import Home from '@/home';
import InvestmensSearch from '@/generals/Investment/views/searchs';

// Auth
import Auth from '@/core/layouts/Auth';
import Login from '@/auth/login/view';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Admin />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/investments',
				element: <InvestmensSearch />,
			},
		],
	},
	{
		path: '/login',
		element: <Auth />,
		children: [
			{
				index: true,
				element: <Login />,
			},
		],
	},
];

export default createBrowserRouter(routes);
