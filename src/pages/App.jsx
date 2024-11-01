import gitLogo from "../assets/github.png"
import { Container } from "./styles";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import Button from "../components/Button";
import { useState } from "react";
import { api } from "../services/api"

function App() {
  const [currentRepo, setCurrentRepo] = useState("")
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id) {
      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist) {
        setRepos(prev => [...prev, data])
        setCurrentRepo("")
        return
      }
    }

    alert("Repositório não encontrado.")
  }

  const handleRemoveRepo = (id) => {
    setRepos(prevRepos => prevRepos.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Git Logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.length > 0 && repos.map(repo => (
          <ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
