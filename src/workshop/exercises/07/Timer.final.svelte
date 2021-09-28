<script>
  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';
  import stop from '@iconify-icons/fa-solid/stop.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  import { useMachine } from '@xstate/svelte';
  import { timerMachine } from './timerMachine.final.js';

  const { state, send } = useMachine(timerMachine);

  $: ({ duration, elapsed, interval } = $state.context);
</script>

<div
  class="timer"
  data-state={$state.toStrings().join(' ')}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 07 Solution</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$state.toStrings().slice(-1)}</div>
    <div class="elapsed" on:click={() => send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      {#if $state.matches('paused') || $state.matches('running.overtime')}
        <button on:click={() => send('RESET')}>Reset</button>
      {/if}

      {#if $state.matches('running.normal')}
        <button on:click={() => send('ADD_MINUTE')}> + 1:00 </button>
      {/if}
    </div>
  </div>

  <div class="actions">
    {#if $state.matches('running.normal')}
      <button on:click={() => send('TOGGLE')} title="Pause timer">
        <Icon icon={pause} />
      </button>
    {/if}

    {#if $state.matches('paused') || $state.matches('idle')}
      <button on:click={() => send('TOGGLE')} title="Start timer">
        <Icon icon={play} />
      </button>
    {/if}

    {#if $state.matches('running.overtime')}
      <button on:click={() => send('RESET')} title="Reset timer">
        <Icon icon={stop} />
      </button>
    {/if}
  </div>
</div>
