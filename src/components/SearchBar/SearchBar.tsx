import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBarStyle from './SearchBar.module.css'
import Button from '../Button/Button'


const SearchBar = () => {
  const [ search, setSearch ] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(search.trimStart() !== "") {
      navigate(`/search/${search}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInout = e.target.value
    if(valueInout === " ") return setSearch("")
    setSearch(valueInout)
  }
  

  return (
    <form onSubmit={handleSearch} className={SearchBarStyle.form}>
      <input type="text" className="text-sm input"
        value={search}
        onChange={handleChange}
        placeholder="What do you want to read?"
      />
      <Button type="submit" typeStyle="secondary">Search</Button>
    </form>
  )
}

export default SearchBar
