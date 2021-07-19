import { assign, createMachine } from 'xstate';

export const clockMachine = createMachine({
  id: 'clock',
  initial: 'active',
  context: {
    time: new Date()
  },
  states: {
    active: {
      invoke: {
        id: 'interval',
        src: () => (callback) => {
          const intervalId = setInterval(() => {
            callback({
              type: 'TICK',
              time: new Date()
            });
          }, 1000);

          return () => {
            clearInterval(intervalId);
          };
        }
      },
      on: {
        TICK: {
          actions: assign({
            time: (context, event) => event.time
          })
        }
      }
    }
  }
});
