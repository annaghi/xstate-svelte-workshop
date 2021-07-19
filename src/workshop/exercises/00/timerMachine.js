import { writable } from 'svelte/store';

const timerMachineConfig = {
  // ...
};

const createTimerMachine = () => {
  const { subscribe, update } = writable(timerMachineConfig.initial);

  return {
    subscribe
    // Add the logic that will read the timerMachineConfig
    // and return the next state, given the current state
    // and event received
    // send: // ...
  };
};

export const timerMachine = createTimerMachine();
