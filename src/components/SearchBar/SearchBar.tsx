import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import "./SearchBar.css"

const SearchBar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search.trimStart() !== "") {
      navigate(`/search/${search}`)
    }
    setSearch("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value
    if (valueInput === " ") return setSearch("")
    setSearch(valueInput)
  }

  return (
    <form onSubmit={handleSearch} className="form">
      <input
        type="text"
        placeholder="What do you want to read?"
        aria-label="What do you want to read?"
        className="input"
        value={search}
        onChange={handleChange}
      />
      <Button type="submit" variant="outline-primary" disabled={search === ""}>
        Search
      </Button>
    </form>
  )
}

export default SearchBar
