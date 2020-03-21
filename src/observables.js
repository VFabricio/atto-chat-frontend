import { derivations, union } from 'folktale/adt/union'
import { append, assoc, compose, lensProp, over } from 'ramda'
import { merge } from 'rxjs'
import { map, pluck, scan, startWith } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket'
import fromSvelteComponent from './fromSvelteComponent'

const initializeObservers = container => {
  // WebSocket

  const wsURI = 'ws:/192.168.15.22:8080'
  const wsSubject = webSocket(wsURI)

  // UI Inputs

  const login$ = fromSvelteComponent(container, 'login')
  const message$ = fromSvelteComponent(container, 'message')

  // Dispatches

  const Dispatch = union('Dispatch', {
    Login({ username }) { return { username } },
    Message({ message, time }) { return { message, time } },
  }).derive(
    derivations.equality,
    derivations.serialization,
  )

  const makeDispatcher = constructor => source => (
    source.pipe(
      pluck('detail'),
      map(constructor),
    )
  )

  const loginDispatch$ = login$.pipe(
    makeDispatcher(Dispatch.Login),
  )

  const messageDispatch$ = message$.pipe(
    makeDispatcher(Dispatch.Message),
  )

  const dispatch$ = merge(
    loginDispatch$,
    messageDispatch$,
  ).pipe(
  )

  // Commands
  const Command = union('Command', {
    SetUser({ username }) { return { username } },
    RepeatedUser({ username }) { return { username } },
    NewMessage({ message, sender, time }) { return { message, sender, time } },
  }).derive(
    derivations.equality,
    derivations.serialization,
  )

  const commands$ = wsSubject.pipe(
    map(json => Command.fromJSON(json)),
  )

  // State

  const updateState = (state, command) => command.matchWith({
    SetUser: ({ username }) => compose(
      assoc('username', username),
      assoc('loggedIn', true),
    ),
    RepeatedUser: ({ username }) => compose(
      assoc('repeatedUserName', username),
      assoc('repeatedUser', true),
    ),
    NewMessage: ({ message, sender, time }) => over(
      lensProp('messages'),
      append({ message, sender, time }),
    ),
  })(state)

  const state$ = commands$.pipe(
    scan(updateState, {}),
    startWith({}),
  )

  // Subscriptions

  state$.subscribe(console.log)

  dispatch$.subscribe(wsSubject)

  return state$
}

export default initializeObservers
