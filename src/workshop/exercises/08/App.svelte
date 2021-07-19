<script>
  import { useMachine } from '@xstate/svelte';
  import { timerAppMachine } from './timerAppMachine.js';

  import { Tabs, TabList, Tab, TabPanels, TabPanel } from '$components/tabs';
  import Clock from './Clock.svelte';
  import NewTimer from './NewTimer.svelte';
  import Timer from './Timer.svelte';

  const { state, send } = useMachine(timerAppMachine);

  $: ({ timers, currentTimer } = $state.context);
</script>

<Tabs dataState={$state.toStrings().join(' ')} initialSelectedIndex={1}>
  <TabList>
    <Tab>Clock</Tab>
    <Tab>Timer</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Clock />
    </TabPanel>

    <TabPanel>
      {#if $state.matches('new')}
        <NewTimer
          timersCount={timers.length}
          onSubmit={(duration) => send({ type: 'ADD', duration })}
          on:cancel={() => send('CANCEL')}
        />
      {/if}
      <div class="timers" hidden={!$state.matches('timer')}>
        {#each timers as timer, index (timer.id)}
          <Timer
            timerRef={timer}
            dataActive={index === currentTimer || undefined}
            on:delete={() => send({ type: 'DELETE', index })}
            on:add={() => send('CREATE')}
          />
        {/each}
      </div>
      <div class="dots" hidden={!$state.matches('timer')}>
        {#each timers as timer, index (timer.id)}
          <div
            class="dot"
            data-active={index === currentTimer || undefined}
            on:click={() => send({ type: 'SWITCH', index })}
          />
        {/each}
      </div>
    </TabPanel>
  </TabPanels>
</Tabs>
