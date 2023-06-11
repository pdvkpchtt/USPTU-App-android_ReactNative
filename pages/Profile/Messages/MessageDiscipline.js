import { useEffect } from 'react'
import MessageList from '../../../features/MessageList'
import MessageItem from '../../../features/MessageList/ui/MessageItem'
import Layout from '../../../shared/ui/Layout'

const MessageDiscipline = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    })
  }, [navigation])
  return (
    <Layout>
      <MessageList navigation={navigation} route={route} />
    </Layout>
  )
}
export default MessageDiscipline
