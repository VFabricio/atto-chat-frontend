import { compose } from 'ramda'
import { Observable } from 'rxjs'

const createObserverCb = (component, eventType) => (
  observer => component.$on(eventType, observer.next.bind(observer))
)

const fromSvelteComponent = compose(Observable.create, createObserverCb)

export default fromSvelteComponent
