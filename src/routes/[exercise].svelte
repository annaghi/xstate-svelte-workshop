<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page }) {
    try {
      const readme = await import(
        `../workshop/exercises/${page.params.exercise}/README.md`
      );

      const exercise =
        '08' === page.params.exercise
          ? await import('../workshop/exercises/08/App.svelte')
          : await import(
              `../workshop/exercises/${page.params.exercise}/Timer.svelte`
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
