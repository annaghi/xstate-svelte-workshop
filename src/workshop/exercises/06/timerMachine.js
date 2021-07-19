import { createMachine, assign } from 'xstate';

const timerExpired = (context) => context.elapsed >= context.duration;

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
      // Add the `normal` and `overtime` nested states here.
      // Don't forget to add the initial state (`normal`)!
      // ...

      on: {
        TICK: {
          actions: assign({
            elapsed: (context) => context.elapsed + context.interval
          })
        },
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
        TOGGLE: 'running'
      }
    }
  },
  on: {
    RESET: {
      target: '.idle'
    }
  }
});
