<script>
  import { onMount } from 'svelte';

  import mockTimezones from '$db/timezones.json';

  import { useMachine } from '@xstate/svelte';
  import { foreignClockMachine } from './foreignClockMachine.js';

  const { state, send } = useMachine(foreignClockMachine);

  $: ({ timezones, timezone, foreignTime } = $state.context);

  export let localTime = null;
  $: localTime &&
    send({
      type: 'LOCAL.UPDATE',
      time: localTime
    });

  let formattedForeignTime = null;
  $: localTime &&
    foreignTime &&
    (formattedForeignTime = $state.context.foreignTime.toLocaleTimeString(
      'en-US',
      {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone
      }
    ));

  onMount(async () => {
    const data = await Promise.resolve(mockTimezones);
    send({ type: 'TIMEZONES.LOADED', data });
  });
</script>

<div class="foreignItem">
  {#if $state.matches('timezonesLoaded') || timezones}
    <select
      class="foreignCity"
      on:change={(event) =>
        send({
          type: 'TIMEZONE.CHANGE',
          value: event.target.value
        })}
    >
      <option disabled selected>Select a timezone</option>
      {#each timezones as timezone}
        <option value={timezone}>{timezone}</option>
      {/each}
    </select>

    <strong class="foreignTime">{formattedForeignTime || '--'}</strong>
  {/if}
</div>

<style>
</style>
