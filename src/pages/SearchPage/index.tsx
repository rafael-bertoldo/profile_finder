import { useContext, useState } from "react"
import { UserContext } from "../../providers/UserContext"

export default function SearchPage() {
  const [userInput, setUserInput] = useState('')
  const {getUser} = useContext(UserContext)

  const getOnClick = () => {
    getUser(userInput)
  }
  return (
    <div>
      <input type="text" placeholder="Buscar dev" onChange={(event) => setUserInput(event.target.value)}/>
      <button onClick={getOnClick}>Buscar</button>
    </div>
  )
}
