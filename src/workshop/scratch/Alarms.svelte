<script>
  import Alarm from './Alarm.svelte';

  import { interpret } from 'xstate';
  import { alarmsMachine } from './alarmsMachine.js';

  const alarmsService = interpret(alarmsMachine).start();

  $: ({ alarms } = $alarmsService.context);
</script>

<button on:click={() => alarmsService.send('ADD_ALARM')}>Add Alarm</button>
{#each alarms as alarm, index (index)}
  <Alarm alarmRef={alarm} />
{/each}
