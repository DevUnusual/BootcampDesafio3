import React,{useState, useEffect} from 'react';
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  },[repositories])

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/Rocketseat/unform",
      title: `Repositorio${(repositories.length + 1)}`,
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    }

    api.post('repositories', newRepository)

    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          {repositories.map(repository => <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>)}
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
