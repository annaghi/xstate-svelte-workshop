<script>
  import { createEventDispatcher, onMount } from 'svelte';

  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';

  import { useMachine } from '@xstate/svelte';
  import { newTimerMachine } from './newTimerMachine.js';

  export let timersCount = 0;
  export let onSubmit = null;

  const { state, send } = useMachine(newTimerMachine, {
    actions: {
      submit: (context) => {
        onSubmit(context.duration);
      }
    }
  });

  $: ({ duration } = $state.context);

  let inputEl = null;
  onMount(() => setTimeout(() => inputEl.focus(), 0));

  const dispatch = createEventDispatcher();
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<form
  class="screen"
  data-screen="new-timer"
  data-testid="new-timer"
  on:submit|preventDefault={send}
>
  <input
    bind:this={inputEl}
    type="number"
    min={0}
    step={1}
    placeholder="00s"
    on:change={send}
    title="Duration"
  />

  <div class="actions">
    {#if timersCount > 0}
      <button
        type="button"
        title="Cancel"
        class="transparent"
        on:click={handleCancel}>Cancel</button
      >
    {/if}

    <button
      title={`Start ${duration}-second timer`}
      hidden={duration <= 0 || undefined}
    >
      <Icon icon={play} />
    </button>
  </div>
</form>
