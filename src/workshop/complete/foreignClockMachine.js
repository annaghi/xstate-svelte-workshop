import { assign, createMachine } from 'xstate';

export const foreignClockMachine = createMachine({
  initial: 'loadingTimezones',
  context: {
    timezones: null,
    timezone: null,
    foreignTime: null
  },
  states: {
    loadingTimezones: {
      on: {
        'TIMEZONES.LOADED': {
          target: 'time',
          actions: assign({
            timezones: (context, event) => event.data
          })
        }
      }
    },
    time: {
      initial: 'noTimezoneSelected',
      states: {
        noTimezoneSelected: {},
        timezoneSelected: {
          on: {
            'LOCAL.UPDATE': {
              actions: assign({
                foreignTime: (context, event) => new Date(event.time)
              })
            }
          }
        }
      },
      on: {
        'TIMEZONE.CHANGE': {
          target: '.timezoneSelected',
          actions: assign({
            timezone: (context, event) => event.value,
            foreignTime: new Date()
          })
        }
      }
    }
  }
});
