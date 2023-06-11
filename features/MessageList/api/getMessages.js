import apiClient from '../../../shared/apiClient'

export default async function getMessages(kont_id, id) {
  const data = await apiClient.post('', `s=lm&kid=${kont_id}&iid=${id}`, {
    params: {
      obj: 'get_StudWork_mess',
    },
  })
  const messages = []
  for (let mess of data.data) {
    const message = {}
    message.id = mess['id']
    message.createdAt = mess['date_create']
    message.readAt = mess['date_read']
    message.fromId = mess['id_from']
    message.toId = mess['id_to']
    message.sender = mess['sender']
    message.text = mess['text_message']
    messages.push(message)
  }

  return messages
}
