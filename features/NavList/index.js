import navListConfig from './config/config'
import List from './UI/List'

const NavList = ({ navigation }) => {
  return <List list={navListConfig(navigation)} />
}

export default NavList
