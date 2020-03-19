import { union } from 'folktale/adt/union'
import { append, assoc, compose, lensProp, over } from 'ramda'
import { merge } from 'rxjs'
import { map, pluck, scan, startWith } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket'
import fromSvelteComponent from './fromSvelteComponent'

const initializeObservers = container => {
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
    ),
    Message: ({ message, time }) => over(
      lensProp('messages'),
      append({ message, time }),
    ),
  })(state)

  const state$ = commands$.pipe(
    scan(updateState, {}),
    startWith({}),
  )

  // WebSocket

  const wsSubject = webSocket('ws://localhost:8080')

  wsSubject.next('hi from the front!')

  // Subscriptions

  state$.subscribe(console.log)
  wsSubject.subscribe(console.log)

  return state$
}

export default initializeObservers
