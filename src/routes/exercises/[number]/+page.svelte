<script>
  export let data;
</script>

<div class="exerciseDescription">
  <a href="/">← Home</a>
  <svelte:component this={data.Readme} />
</div>
<svelte:component this={data.Exercise} />
