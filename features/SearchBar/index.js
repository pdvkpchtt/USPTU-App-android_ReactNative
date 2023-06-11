import Search from './ui/Search'

const SearchBar = ({ setSearchText, placeholder, search, navigation, isFocus }) => {
  return <Search setSearchText={setSearchText} placeholder={placeholder} search={search} isFocus={isFocus} />
}

export default SearchBar
