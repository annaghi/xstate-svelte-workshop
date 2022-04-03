<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params }) {
    try {
      const readme = await import(
        `../workshop/exercises/${params.exercise}/README.md`
      );

      const exercise =
        '08' === params.exercise
          ? await import('../workshop/exercises/08/App.svelte')
          : await import(
              `../workshop/exercises/${params.exercise}/Timer.svelte`
            );

      return {
        props: {
          Readme: readme.default,
          Exercise: exercise.default
        }
      };
    } catch (error) {
      return {
        status: 307,
        redirect: '/'
      };
    }
  }
</script>

<script>
  export let Readme;
  export let Exercise;
</script>

<div class="exerciseDescription">
  <a href="/">← Home</a>
  <svelte:component this={Readme} />
</div>
<svelte:component this={Exercise} />
