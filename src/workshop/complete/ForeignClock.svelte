<script>
  import { onMount } from 'svelte';

  import mockTimezones from '$lib/timezones.json';

  import { interpret } from 'xstate';
  import { foreignClockMachine } from './foreignClockMachine.js';

  const foreignClockService = interpret(foreignClockMachine).start();

  $: ({ timezones, timezone, foreignTime } = $foreignClockService.context);

  export let localTime = null;
  $: localTime &&
    foreignClockService.send({
      type: 'LOCAL.UPDATE',
      time: localTime
    });

  let formattedForeignTime = null;
  $: localTime &&
    foreignTime &&
    (formattedForeignTime =
      $foreignClockService.context.foreignTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone
      }));

  onMount(async () => {
    const data = await Promise.resolve(mockTimezones);
    foreignClockService.send({ type: 'TIMEZONES.LOADED', data });
  });
</script>

<div class="foreignItem">
  {#if $foreignClockService.matches('timezonesLoaded') || timezones}
    <select
      class="foreignCity"
      on:change={(event) =>
        foreignClockService.send({
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
