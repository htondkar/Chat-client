import { observable, action, computed } from 'mobx'

class chatsStore {
  @observable users = []

  @observable chats = []

  @observable activeChat = null

  @observable conversations = {}

  @computed
  get isThereActiveChat() {
    return Boolean(this.activeChat)
  }

  doesChatExist(receiverId) {
    const index = this.chats.findIndex(chat => chat.receiver === receiverId)
    return index === -1 ? false : true
  }

  @action
  setActiveChatByUser = receiverId => {
    const chat = this.chats.find(chat => chat.receiver === receiverId)
    if (chat) this.setActiveChat(chat._id)
  }

  @action
  setUsers = users => {
    this.users = users
  }

  @action
  addNewChat = newChat => {
    this.chats.push(newChat)
    this.setActiveChat(newChat._id)
  }

  @action
  newMessage({ senderId, message }) {
    const chat = this.chats.find(chat => chat.receiver === senderId)
    if (chat) {
      chat.messages.push({ message, type: 'received' })
    }
  }

  @action
  setActiveChat = chatId => {
    this.activeChat = chatId
  }

  getChatById(chatId) {
    const chat = this.chats.find(chat => chat._id === chatId)
    return chat || null
  }

  @computed
  get activeChatInfo() {
    return this.getChatById(this.activeChat)
  }

  @action
  findUserById = userId => this.users.find(user => user._id === userId) || null

  @action findConversationWith = userId => this.conversations[userId] || []

  @action
  onMessage = message => {
    this.wroteNewMessageByChatId(message)
    import('../webSocket').then(({ default: webSocket }) => {
      webSocket.sendMessage({ to: this.activeChatInfo.receiver, message })
    })
  }

  findChatById = chatId => this.chats.find(chat => chat._id === chatId) || null

  @action
  wroteNewMessageByChatId(message) {
    const chat = this.findChatById(this.activeChat)
    chat.messages.push({ message, type: 'sent' })
  }
}

const store = new chatsStore()

export default store
