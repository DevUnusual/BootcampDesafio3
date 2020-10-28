import React,{useState, useeffect} from 'react';
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setProjects] = useState([])

  useeffect(() => {
    api.get('/repositories').then((response) => {
      setProjects(response.data)
    })
  },[])

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/Rocketseat/unform",
      title: `Repositorio${(repositories.length + 1)}`,
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    }

    api.post('repositories', newRepository)

    setProjects([...repositories, newRepository])
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
