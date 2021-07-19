import { writable } from 'svelte/store';

export const timerMachineConfig = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        TOGGLE: 'running'
      }
    },
    running: {
      on: {
        TOGGLE: 'paused'
      }
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle'
      }
    }
  }
};

const createTimerMachine = () => {
  const { subscribe, update } = writable(timerMachineConfig.initial);

  return {
    subscribe,
    send: (event) =>
      update((state) => timerMachineConfig.states[state]?.on?.[event])
  };
};

export const timerMachine = createTimerMachine();
