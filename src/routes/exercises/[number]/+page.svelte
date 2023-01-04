<script>
  import { page } from '$app/stores';
  export let data;
</script>

<svelte:head>
  <title>Exercise {$page.params.number} · XState Svelte Workshop</title>
  <meta name="description" content="XState Svelte Workshop" />
</svelte:head>

<div class="exerciseDescription">
  <a href="/">← Home</a>
  <svelte:component this={data.Readme} />
</div>
<svelte:component this={data.Exercise} />
