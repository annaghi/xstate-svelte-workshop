<script context="module">
  export function load({ error, status }) {
    return {
      // status: 307,
      // redirect: '/',
      props: {
        title: `${status}: ${error.message}`
      }
    };
  }
</script>

<script>
  export let title;
</script>

<h1>{title}</h1>
