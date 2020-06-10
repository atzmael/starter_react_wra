import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

import Projects from './components/Projects';

function App() {

  const [datas, setDatas] = useState();
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    // Fetching all datas from a custom post (to be created in backoffice)
    let my_custom_post = "projects";
    let projectsURL = `${process.env.REACT_APP_API}/${my_custom_post}`;
    Axios.get(projectsURL)
      .then(res => {
        setDatas(res.data);
        setLoaded(true);
        console.log(datas);
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div className="App">
      <h1>Datas</h1>
      {loaded && datas.map((data, index) => {
        return (
          <Project key={index} data={data} />
        )
      })}
    </div>
  );
}

export default App;
