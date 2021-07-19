<script>
  import { getContext, onMount, tick } from 'svelte';

  import getId from './_id.js';
  import { TABS } from './Tabs.svelte';

  let tabEl;

  const tab = {
    id: getId()
  };
  const { registerTab, registerTabElement, selectTab, selectedTab, controls } =
    getContext(TABS);

  let isSelected;
  $: isSelected = $selectedTab === tab;

  registerTab(tab);

  onMount(async () => {
    await tick();
    registerTabElement(tabEl);
  });
</script>

<button
  bind:this={tabEl}
  role="tab"
  id={tab.id}
  aria-controls={$controls[tab.id]}
  aria-selected={isSelected}
  tabindex={isSelected ? 0 : -1}
  data-selected={isSelected || undefined}
  class:selected={isSelected}
  class="app-tab svelte-tabs__tab"
  type="button"
  on:click={() => selectTab(tab)}
>
  <slot />
</button>
