import { createMachine, assign, spawn } from 'xstate';
import { createTimerMachine } from './timerMachine';

export const timerAppMachine = createMachine({
  initial: 'new',
  context: {
    duration: 0,
    currentTimer: -1,
    timers: []
  },
  states: {
    new: {
      on: {
        CANCEL: {
          target: 'timer',
          cond: (context) => context.timers.length > 0
        }
      }
    },
    timer: {
      on: {
        DELETE: {
          actions: assign((context) => {
            const timers = context.timers.filter(
              (_, index) => index !== event.index
            );
            const currentTimer = timers.length - 1;

            return {
              timers,
              currentTimer
            };
          }),
          target: 'deleting'
        }
      }
    },
    deleting: {
      always: [
        {
          target: 'new',
          cond: (context) => context.timers.length === 0
        },
        { target: 'timer' }
      ]
    }
  },
  on: {
    ADD: {
      // Uncomment this once you've added the spawn() code:
      // target: '.timer',
      actions: assign((context, event) => {
        // Spawn a new timerMachine here (using createTimerMachine)
        // and append this timer to context.timers
        // ...

        // Change the below line to return the updated context:
        // - `context.timers` should contain the appended spawned timer
        // - `context.currentTimer` should be the index of that spawned timer
        return context;
      })
    },
    CREATE: 'new',
    SWITCH: {
      actions: assign({
        currentTimer: (context, event) => event.index
      })
    }
  }
});
