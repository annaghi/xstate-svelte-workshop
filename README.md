# State Modeling in Svelte with XState

Welcome to the port of the [Frontend Masters React + XState workshop](https://github.com/davidkpiano/frontend-masters-react-workshop) written in [Svelte](https://svelte.dev/) and built with [SvelteKit](https://kit.svelte.dev/)!

You can check out

- the [application](https://xstate-svelte-workshop.vercel.app/) on Vercel, and
- the [course](https://frontendmasters.com/courses/xstate-react) on Frontend Masters.

## XState

- GitHub repo: https://github.com/statelyai/xstate
- Documentation: http://xstate.js.org/docs
- Visualizer: http://xstate.js.org/viz

## Getting Started

To run this workshop:

- Clone this repo
- Run `npm install`
- Run `npm run dev`
- Navigate to [http://localhost:4000/00](http://localhost:4000/00) to get to the first exercise.

## Exercises

Exercises are separated by directory in `workshop/exercises/##/`. Each directory will contain a `README.md` describing the goal of the exercise, as well as tips and comments in the `Timer.svelte` and `timerMachine.js` files.

Your objective is to accomplish the goals in `README.md`. If you get stuck, refer to the `timerMachine.final.js` file and/or import `Timer.final.svelte` in `routes/exercises/[number]/+page.js`.
