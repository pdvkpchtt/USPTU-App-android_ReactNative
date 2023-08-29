import navListConfigDemo from '../navListConfigDemo'
import List from '../../features/NavList/UI/List'

const DemoNavList = ({ navigation }) => {
  return <List list={navListConfigDemo(navigation)} />
}

export default DemoNavList
