<script>
  import { onDestroy } from 'svelte';

  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';
  import stop from '@iconify-icons/fa-solid/stop.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  import { useMachine } from '@xstate/svelte';
  import { timerMachine } from './timerMachine.js';

  const { state, send } = useMachine(timerMachine);

  $: ({ duration, elapsed, interval } = $state.context);
  $: $state.value && sendTick();

  let intervalId = null;
  function sendTick() {
    // Replace $state-value === ... with $state.matches(...)
    if ($state.value === 'running') {
      if (!intervalId) {
        intervalId = setInterval(() => {
          send('TICK');
        }, interval * 1000);
      }
    } else if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<!-- Replace $state-value === ... with $state.matches(...) -->
<div
  class="timer"
  data-state={$state.toStrings().join(' ')}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 06</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$state.toStrings().slice(-1)}</div>
    <div class="elapsed" on:click={() => send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      <!-- Replace the 'expired' state with 'running.overtime' -->
      {#if $state.value === 'paused' || $state.value === 'expired'}
        <button on:click={() => send('RESET')}>Reset</button>
      {/if}

      <!-- Refine the state such as 'running.normal' -->
      {#if $state.value === 'running'}
        <button on:click={() => send('ADD_MINUTE')}> + 1:00 </button>
      {/if}
    </div>
  </div>

  <div class="actions">
    <!-- Refine the state such as 'running.normal' -->
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

    {#if $state.matches('running.overtime')}
      <button
        on:click={() => {
          // ...
        }}
        title="Reset timer"
      >
        <Icon icon={stop} />
      </button>
    {/if}
  </div>
</div>
