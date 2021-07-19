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
      initial: 'normal',
      states: {
        normal: {
          always: {
            target: 'overtime',
            cond: timerExpired
          },
          on: {
            RESET: undefined
          }
        },
        overtime: {
          on: {
            TOGGLE: undefined
          }
        }
      },
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
