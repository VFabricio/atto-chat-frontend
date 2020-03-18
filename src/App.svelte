<script>
  import { union } from 'folktale/adt/union'
  import { append, assoc, compose, lensProp, over } from 'ramda'
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
    const message$ = fromSvelteComponent(container, 'message')

    // Commands

    const Command = union('Command', {
      Login({ username }) { return { username } },
      Message({ message, time }) { return { message, time } },
    })

    const loginCommand$ = login$.pipe(
      pluck('detail'),
      map(Command.Login),
    )

    const messageCommand$ = message$.pipe(
      pluck('detail'),
      map(Command.Message),
    )

    const commands$ = merge(
      loginCommand$,
      messageCommand$,
    )

    // State

    const updateState = (state, command) => command.matchWith({
      Login: ({ username }) => compose(
        assoc('username', username),
        assoc('loggedIn', true),
      )(state),
      Message: messageDetails => over(
        lensProp('messages'),
        append(messageDetails),
        state,
      ),
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