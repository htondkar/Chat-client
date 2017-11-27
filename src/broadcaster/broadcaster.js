import shortId from 'shortid'

class Broadcaster {
  constructor() {
    this.subscribers = []
    /* format: {fn: Function(event), eventType: 'xxx', id} */
  }

  filterWithEventType = event => subscriber =>
    subscriber.eventType ? event.type === subscriber.eventType : true

  broadcast(event) {
    this.subscribers
      .filter(this.filterWithEventType(event))
      .forEach(subscriber => subscriber.fn(event))
  }

  subscribe(newSubscriber) {
    const id = shortId.generate()
    this.subscribers.push({ ...newSubscriber, id })
    return id
  }

  unsubscribe(subId) {
    const index = this.subscribers.findIndex(
      subscriber => subscriber.id === subId
    )

    if (index !== -1) {
      this.subscribers.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

export default new Broadcaster()

