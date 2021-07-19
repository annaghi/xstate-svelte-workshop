import { createMachine, assign, sendParent } from 'xstate';

const saveAlarm = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 2000);
  });
};

export const alarmMachine = createMachine({
  initial: 'inactive',
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: {
        TOGGLE: [
          {
            target: 'pending',
            actions: assign({
              count: (context, event) => {
                return context.count + 1;
              }
            }),
            cond: (context, event) => {
              return context.count < 5;
            }
          },
          {
            target: 'rejected'
          }
        ]
      }
    },
    pending: {
      invoke: {
        id: 'timeout',
        src: (context, event) => (sendBack, receive) => {
          receive((event) => {
            console.log(event);
          });

          const timeout = setTimeout(() => {
            sendBack({
              type: 'SUCCESS'
            });
          }, 2000);

          return () => {
            clearTimeout(timeout);
          };
        },
        onError: 'rejected'
      },
      on: {
        SUCCESS: 'active',
        TOGGLE: {
          target: 'inactive'
        }
      }
    },
    active: {
      entry: sendParent('ACTIVE'),
      on: {
        TOGGLE: {
          target: 'inactive'
        }
      }
    },
    rejected: {}
  }
});
