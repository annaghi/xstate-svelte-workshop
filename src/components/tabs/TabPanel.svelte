<script>
  import { getContext } from 'svelte';

  import getId from './_id.js';
  import { TABS } from './Tabs.svelte';

  const panel = {
    id: getId()
  };
  const { registerPanel, selectedPanel, labeledBy } = getContext(TABS);

  registerPanel(panel);
</script>

<div
  id={panel.id}
  aria-labelledby={$labeledBy[panel.id]}
  class="app-panel"
  role="tabpanel"
  hidden={$selectedPanel !== panel || undefined}
>
  <!-- {#if $selectedPanel === panel} -->
  <slot />
  <!-- {/if} -->
</div>
