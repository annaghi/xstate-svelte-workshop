<script>
  import Icon from '@iconify/svelte';
  import play from '@iconify/icons-fa-solid/play.js';
  import pause from '@iconify/icons-fa-solid/pause.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  // import { useMachine } from '@xstate/svelte';
  // import { timerMachine } from './timerMachine.js';

  const { state, send } = { state: {}, send: () => {} };

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1
  };
</script>

<div
  class="timer"
  data-state={state.value}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 01</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{state.value}</div>
    <div
      class="elapsed"
      on:click={() => {
        // ...
      }}
    >
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      {#if state === 'paused'}
        <button
          on:click={() => {
            // ...
          }}>Reset</button
        >
      {/if}
    </div>
  </div>

  <div class="actions">
    {#if state === 'running'}
      <button
        on:click={() => {
          // ...
        }}
        title="Pause timer"
      >
        <Icon icon={pause} />
      </button>
    {/if}

    {#if state === 'paused' || state === 'idle'}
      <button
        on:click={() => {
          // ...
        }}
        title="Start timer"
      >
        <Icon icon={play} />
      </button>
    {/if}
  </div>
</div>
