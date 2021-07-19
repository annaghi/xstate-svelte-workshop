# Exercise 01 - Using XState

In this exercise, we're going to take the machine you created and use it within [XState](https://xstate.js.org/docs) with [XState Svelte](https://xstate.js.org/docs/packages/xstate-svelte/). If you created the machine using object notation, this should be pretty straightforward.

## Goals

- Install `xstate` and `@xstate/svelte`
- In `timerMachine.js`, use `createMachine(...)` to create a state machine in XState.
- In `Timer.svelte`, use the `useMachine(...)` hook with that created machine. It will return `state` and `send`, where `state` is a `readable store`.
- The finite state value is now in `$state.value`, so use that instead of `state`.
