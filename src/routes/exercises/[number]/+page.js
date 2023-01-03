/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {
    const readme = await import(`../../../workshop/exercises/${params.number}/README.md`);

    const exercise =
      '08' === params.number
        ? await import('../../../workshop/exercises/08/App.svelte')
        : await import(`../../../workshop/exercises/${params.number}/Timer.svelte`);

    return {
      Readme: readme.default,
      Exercise: exercise.default
    };
  } catch (error) {
    return {
      status: 307,
      redirect: '/'
    };
  }
}
