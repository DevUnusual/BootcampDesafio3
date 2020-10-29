import React,{useState, useEffect} from 'react';
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Repositorio${(repositories.length + 1)}`,
      url: "https://github.com/Rocketseat/unform",
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository =>( 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
