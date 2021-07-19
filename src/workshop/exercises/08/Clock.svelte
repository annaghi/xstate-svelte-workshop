<script>
  import ForeignClock from './ForeignClock.svelte';

  import { useMachine } from '@xstate/svelte';
  import { clockMachine } from './clockMachine';

  const { state } = useMachine(clockMachine);

  $: ({ time } = $state.context);
</script>

<div class="clock">
  <div class="local">
    <h1 class="localTime">
      {time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })}
    </h1>
    <strong class="localDate">{time.toLocaleDateString()}</strong>
  </div>
  <div class="foreign">
    <ForeignClock localTime={time} />
  </div>
</div>
