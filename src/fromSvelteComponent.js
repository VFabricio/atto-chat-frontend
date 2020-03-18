import { bind, compose } from 'ramda'
import { Observable } from 'rxjs'

const createObserverCb = (component, eventType) => (
  observer => component.$on(eventType, bind(observer.next, observer))
)

const fromSvelteComponent = compose(Observable.create, createObserverCb)

export default fromSvelteComponent
