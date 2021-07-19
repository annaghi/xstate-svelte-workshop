<script>
  import { createEventDispatcher } from 'svelte';

  import Icon from '@iconify/svelte';
  import play from '@iconify/icons-fa-solid/play.js';
  import pause from '@iconify/icons-fa-solid/pause.js';
  import stop from '@iconify/icons-fa-solid/stop.js';

  import ProgressCircle from '$components/ProgressCircle.svelte';

  export let timerRef = null;
  export let dataActive = undefined;

  const { send } = timerRef;
  $: ({ duration, elapsed, interval } = $timerRef.context);

  const dispatch = createEventDispatcher();

  function handleAdd() {
    dispatch('add');
  }

  function handleDelete() {
    dispatch('delete');
  }
</script>

<div
  class="timer"
  data-state={$timerRef.toStrings().join(' ')}
  data-active={dataActive}
  style="--duration:{duration}; --elapsed:{elapsed}; --interval:{interval};"
>
  <header><strong>XState Minute Timer</strong></header>
  <ProgressCircle />

  <div class="display">
    <div class="label">{$timerRef.toStrings().slice(-1)}</div>
    <div class="elapsed" on:click={() => send('TOGGLE')}>
      {Math.ceil(duration - elapsed)}
    </div>

    <div class="controls">
      {#if $timerRef.matches('paused') || $timerRef.matches('running.overtime')}
        <button on:click={() => send('RESET')}>Reset</button>
      {/if}

      {#if $timerRef.matches('running.normal')}
        <button on:click={() => send('ADD_MINUTE')}> + 1:00 </button>
      {/if}
    </div>
  </div>

  <div class="actions">
    <button class="transparent" title="Delete timer" on:click={handleDelete}
      >Delete</button
    >

    {#if $timerRef.matches('running.normal')}
      <button on:click={() => send('TOGGLE')} title="Pause timer">
        <Icon icon={pause} />
      </button>
    {/if}

    {#if $timerRef.matches('paused') || $timerRef.matches('idle')}
      <button on:click={() => send('TOGGLE')} title="Start timer">
        <Icon icon={play} />
      </button>
    {/if}

    {#if $timerRef.matches('running.overtime')}
      <button on:click={() => send('RESET')} title="Reset timer">
        <Icon icon={stop} />
      </button>
    {/if}

    <button class="transparent" title="Add timer" on:click={handleAdd}
      >Add Timer</button
    >
  </div>
</div>
