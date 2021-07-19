import { createMachine, assign, spawn } from 'xstate';
import { alarmMachine } from './alarmMachine.js';

export const alarmsMachine = createMachine({
  context: {
    alarms: []
  },
  initial: 'working',
  states: {
    working: {
      on: {
        ADD_ALARM: {
          actions: assign({
            alarms: (context, event) => {
              const alarm = spawn(alarmMachine);
              return context.alarms.concat(alarm);
            }
          })
        },
        ACTIVE: {
          actions: (context, event) => {
            console.log('Received', event);
          }
        }
      }
    }
  }
});
