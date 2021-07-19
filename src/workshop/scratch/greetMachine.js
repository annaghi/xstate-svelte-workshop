import { createMachine } from 'xstate';

export const greetMachine = createMachine({
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        {
          cond: () => {
            return new Date().getHours() < 12;
          },
          target: 'morning'
        },
        { target: 'day' }
      ]
    },
    morning: {},
    day: {}
  }
});
