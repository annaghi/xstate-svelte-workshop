<script>
  import { interpret } from 'xstate';
  import { timerAppMachine } from './timerAppMachine.js';

  import { Tabs, TabList, Tab, TabPanels, TabPanel } from '$lib/tabs';
  import Clock from './Clock.svelte';
  import NewTimer from './NewTimer.svelte';
  import Timer from './Timer.svelte';

  const timerAppService = interpret(timerAppMachine).start();

  $: ({ timers, currentTimer } = $timerAppService.context);
</script>

<Tabs
  dataState={$timerAppService.toStrings().join(' ')}
  initialSelectedIndex={1}
>
  <TabList>
    <Tab>Clock</Tab>
    <Tab>Timer</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Clock />
    </TabPanel>

    <TabPanel>
      {#if $timerAppService.matches('new')}
        <NewTimer
          timersCount={timers.length}
          onSubmit={(duration) =>
            timerAppService.send({ type: 'ADD', duration })}
          on:cancel={() => timerAppService.send('CANCEL')}
        />
      {/if}
      <div class="timers" hidden={!$timerAppService.matches('timer')}>
        {#each timers as timer, index (timer.id)}
          <Timer
            timerRef={timer}
            dataActive={index === currentTimer || undefined}
            on:delete={() => timerAppService.send({ type: 'DELETE', index })}
            on:add={() => timerAppService.send('CREATE')}
          />
        {/each}
      </div>
      <div class="dots" hidden={!$timerAppService.matches('timer')}>
        {#each timers as timer, index (timer.id)}
          <div
            class="dot"
            data-active={index === currentTimer || undefined}
            on:click={() => timerAppService.send({ type: 'SWITCH', index })}
          />
        {/each}
      </div>
    </TabPanel>
  </TabPanels>
</Tabs>
