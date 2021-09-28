<script>
  import { onDestroy } from 'svelte';

  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  import { useMachine } from '@xstate/svelte';
  import { timerMachine } from './timerMachine.js';

  const { state, send } = useMachine(timerMachine);

  $: ({ duration, elapsed, interval } = $state.context);

  // Add a reactive function reference here to send a TICK event on every `interval`
  // ...
</script>

<div
  class="timer"
  data-state={$state.value}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 03</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$state.value}</div>
    <div class="elapsed" on:click={() => send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      {#if $state.value === 'paused'}
        <button on:click={() => send('RESET')}>Reset</button>
      {/if}

      {#if $state.value === 'running'}
        <button on:click={() => send('ADD_MINUTE')}> + 1:00 </button>
      {/if}
    </div>
  </div>

  <div class="actions">
    {#if $state.value === 'running'}
      <button on:click={() => send('TOGGLE')} title="Pause timer">
        <Icon icon={pause} />
      </button>
    {/if}

    {#if $state.value === 'paused' || $state.value === 'idle'}
      <button on:click={() => send('TOGGLE')} title="Start timer">
        <Icon icon={play} />
      </button>
    {/if}
  </div>
</div>
