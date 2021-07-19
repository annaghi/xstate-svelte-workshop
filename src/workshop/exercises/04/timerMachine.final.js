import { createMachine, assign } from 'xstate';

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 5,
    elapsed: 0,
    interval: 0.1
  },
  states: {
    idle: {
      entry: assign({
        duration: 5,
        elapsed: 0
      }),
      on: {
        TOGGLE: 'running'
      }
    },
    running: {
      on: {
        TICK: [
          {
            actions: assign({
              elapsed: (context) => context.elapsed + context.interval
            }),
            cond: (context) => {
              return context.elapsed <= context.duration;
            }
          },
          { target: 'expired' }
        ],
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: assign({
            duration: (context) => context.duration + 60
          })
        }
      }
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle'
      }
    },
    expired: {
      on: {
        RESET: 'idle'
      }
    }
  }
});
