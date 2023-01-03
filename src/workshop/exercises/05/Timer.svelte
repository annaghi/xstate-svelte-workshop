<script>
  import { onDestroy } from 'svelte';

  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';

  import ProgressCircle from '$lib/ProgressCircle.svelte';

  import { interpret } from 'xstate';
  import { timerMachine } from './timerMachine.final.js';

  const timerService = interpret(timerMachine).start();

  $: ({ duration, elapsed, interval } = $timerService.context);
  $: $timerService.value && sendTick();

  let intervalId = null;
  function sendTick() {
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

<div
  class="timer"
  data-state={$timerService.value}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 05</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$timerService.value}</div>
    <div class="elapsed" on:click={() => timerService.send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      {#if $timerService.value === 'paused' || $timerService.value === 'expired'}
        <button on:click={() => timerService.send('RESET')}>Reset</button>
      {/if}

      {#if $timerService.value === 'running'}
        <button on:click={() => timerService.send('ADD_MINUTE')}>
          + 1:00
        </button>
      {/if}
    </div>
  </div>

  <div class="actions">
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
  </div>
</div>
