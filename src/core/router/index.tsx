import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import { PrivateOutlet, PublicOutlet } from '@/core/router/CheckPageNavigation';

import Admin from '@/core/layouts/Admin';
import Home from '@/home';
import InvestmensSearch from '@/generals/Investment/views/searchs';
import InvestmentsCreate from '@/generals/Investment/views/create';
import InvestmentsEdit from '@/generals/Investment/views/edit';

// Auth
import Auth from '@/core/layouts/Auth';
import Login from '@/auth/login/view';

const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<PrivateOutlet>
				<Admin />
			</PrivateOutlet>
		),
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/investments',
				element: <InvestmensSearch />,
			},
			{
				path: '/investments/create',
				element: <InvestmentsCreate />,
			},
			{
				path: '/investments/edit/:id',
				element: <InvestmentsEdit />,
			},
		],
	},
	{
		path: '/login',
		element: (
			<PublicOutlet>
				<Auth />
			</PublicOutlet>
		),
		children: [
			{
				index: true,
				element: <Login />,
			},
		],
	},
];

export default createBrowserRouter(routes);
