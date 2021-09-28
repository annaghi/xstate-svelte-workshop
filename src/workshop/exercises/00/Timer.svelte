<script>
  import Icon from '@iconify/svelte';
  import play from '@iconify-icons/fa-solid/play.js';
  import pause from '@iconify-icons/fa-solid/pause.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  // Import the timer machine which is implemented as a custom store:
  // import { ... } from './timerMachine.js';

  const timerMachine = ''; // delete me - use the imported store instead!

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1
  };
</script>

<div
  class="timer"
  data-state={timerMachine}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><h1>Exercise 00</h1></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{timerMachine}</div>
    <div
      class="elapsed"
      on:click={() => {
        // ...
      }}
    >
      {Math.ceil(duration - elapsed)}
    </div>
    <div class="controls">
      {#if timerMachine === 'paused'}
        <button
          on:click={() => {
            // ...
          }}>Reset</button
        >
      {/if}
    </div>
  </div>

  <div class="actions">
    {#if timerMachine === 'running'}
      <button
        on:click={() => {
          // ...
        }}
        title="Pause timer"
      >
        <Icon icon={pause} />
      </button>
    {/if}

    {#if timerMachine === 'paused' || timerMachine === 'idle'}
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
