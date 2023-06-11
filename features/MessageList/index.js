import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useUserStore } from '../../entities/user'
import { LoadingBox } from '../../shared/ui/LoadingBox'
import getMessages from './api/getMessages'
import List from './ui/List'
import MessageItem from './ui/MessageItem'
import validateMessages from './utils/validateMessages'

const MessageList = ({ navigation, route }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const id = useUserStore((state) => state.id)
  const getData = async () => {
    const data = await getMessages(id, route.params.id)
    setMessages(validateMessages(data))
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  // console.log(messages[0])
  return loading ? <LoadingBox /> : <List items={messages} />
  //return
}

export default MessageList
