<script>
  import { onDestroy } from 'svelte';

  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';
  import stop from '@iconify-icons/fa-solid/stop.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  import { interpret } from 'xstate';
  import { timerMachine } from './timerMachine.final.js';

  const timerService = interpret(timerMachine).start();

  $: ({ duration, elapsed, interval } = $timerService.context);
  $: $timerService.value && sendTick();

  let intervalId = null;
  function sendTick() {
    // Replace $timerService-value === ... with $timerService.matches(...)
    if ($timerService.value === 'running') {
      if (!intervalId) {
        intervalId = setInterval(() => {
          timerService.send('TICK');
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

<!-- Replace $timerService-value === ... with $timerService.matches(...) -->
<div
  class="timer"
  data-state={$timerService.toStrings().join(' ')}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 06</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$timerService.toStrings().slice(-1)}</div>
    <div class="elapsed" on:click={() => timerService.send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      <!-- Replace the 'expired' state with 'running.overtime' -->
      {#if $timerService.value === 'paused' || $timerService.value === 'expired'}
        <button on:click={() => timerService.send('RESET')}>Reset</button>
      {/if}

      <!-- Refine the state such as 'running.normal' -->
      {#if $timerService.value === 'running'}
        <button on:click={() => timerService.send('ADD_MINUTE')}>
          + 1:00
        </button>
      {/if}
    </div>
  </div>

  <div class="actions">
    <!-- Refine the state such as 'running.normal' -->
    {#if $timerService.value === 'running'}
      <button on:click={() => timerService.send('TOGGLE')} title="Pause timer">
        <Icon icon={pause} />
      </button>
    {/if}

    {#if $timerService.value === 'paused' || $timerService.value === 'idle'}
      <button on:click={() => timerService.send('TOGGLE')} title="Start timer">
        <Icon icon={play} />
      </button>
    {/if}

    {#if $timerService.matches('running.overtime')}
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
