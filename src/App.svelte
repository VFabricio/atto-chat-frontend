<script>
  import { union } from 'folktale/adt/union'
  import { assoc, compose } from 'ramda'
  import { merge } from 'rxjs'
  import { map, pluck, scan, startWith } from 'rxjs/operators'
  import { onMount } from 'svelte'
  import fromSvelteComponent from './fromSvelteComponent'
  import Container from './Container.svelte'

  let container

  let state$

  const init = () => {
    // UI Inputs

    const login$ = fromSvelteComponent(container, 'login')

    // Commands

    const Command = union('Command', {
      Login(username) { return { username } },
    })

    const loginCommand$ = login$.pipe(
      pluck('detail', 'username'),
      map(Command.Login),
    )

    const commands$ = merge(
      loginCommand$,
    )

    // State

    const updateState = (state, command) => command.matchWith({
      Login: ({ username }) => compose(
        assoc('username', username),
        assoc('loggedIn', true),
      )(state),
    })

    state$ = commands$.pipe(
      scan(updateState, {}),
      startWith({}),
    )

    // Subscriptions

    state$.subscribe(console.log)
  }

  onMount(init)
</script>

<Container bind:this={container} state={$state$}/>