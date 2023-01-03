import { redirect } from '@sveltejs/kit';

const exercises = ['00', '01', '02', '03', '04', '05', '06', '07', '08'];

/** @type {import('./$types').LayoutServerLoad} */
export function load({ route, params }) {
  if (!route.id || (params.number && !exercises.includes(params.number))) {
    throw redirect(307, '/');
  }
}
