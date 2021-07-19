<script>
  import Alarm from './Alarm.svelte';

  import { useMachine } from '@xstate/svelte';
  import { alarmsMachine } from './alarmsMachine.js';

  const { state, send } = useMachine(alarmsMachine);

  $: ({ alarms } = $state.context);
</script>

<button on:click={() => send('ADD_ALARM')}>Add Alarm</button>
{#each alarms as alarm, index (index)}
  <Alarm alarmRef={alarm} />
{/each}
