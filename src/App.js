import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(res =>{
      setRepositories(res.data);
    })
  },[])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      url: 'http://localhost:3030',
      title: `Novo repositório ${Date.now()}`,
      techs: "ReactJS",
      likes: 0
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const newRepositoriesList = repositories.filter((repository) => repository.id !== id);

    setRepositories(newRepositoriesList)

    return await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map (repository =>  
          <li key={repository.id}>
            {repository.title}

          <button type='button' onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
