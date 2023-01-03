<script>
  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';
  import stop from '@iconify-icons/fa-solid/stop.js';

  import ProgressCircle from '$lib/ProgressCircle.svelte';

  import { interpret } from 'xstate';
  import { timerMachine } from './timerMachine.final.js';

  const timerService = interpret(timerMachine).start();

  $: ({ duration, elapsed, interval } = $timerService.context);
</script>

<div
  class="timer"
  data-state={$timerService.toStrings().join(' ')}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 07 Solution</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$timerService.toStrings().slice(-1)}</div>
    <div class="elapsed" on:click={() => timerService.send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      {#if $timerService.matches('paused') || $timerService.matches('running.overtime')}
        <button on:click={() => timerService.send('RESET')}>Reset</button>
      {/if}

      {#if $timerService.matches('running.normal')}
        <button on:click={() => timerService.send('ADD_MINUTE')}>
          + 1:00
        </button>
      {/if}
    </div>
  </div>

  <div class="actions">
    {#if $timerService.matches('running.normal')}
      <button on:click={() => timerService.send('TOGGLE')} title="Pause timer">
        <Icon icon={pause} />
      </button>
    {/if}

    {#if $timerService.matches('paused') || $timerService.matches('idle')}
      <button on:click={() => timerService.send('TOGGLE')} title="Start timer">
        <Icon icon={play} />
      </button>
    {/if}

    {#if $timerService.matches('running.overtime')}
      <button on:click={() => timerService.send('RESET')} title="Reset timer">
        <Icon icon={stop} />
      </button>
    {/if}
  </div>
</div>
