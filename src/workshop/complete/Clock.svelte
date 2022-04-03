<script>
  import ForeignClock from './ForeignClock.svelte';

  import { interpret } from 'xstate';
  import { clockMachine } from './clockMachine';

  const clockService = interpret(clockMachine).start();

  $: ({ time } = $clockService.context);
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
