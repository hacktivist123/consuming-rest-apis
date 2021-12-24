import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const List = (props) => {
    const { repos } = props;
    if (!repos || repos.length === 0)
      return <h3>Perae Amigo, tá carregando...</h3>;
    return (
      <ul className="list-all">
        {repos
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.fantasyName.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val) => {
            return (
              <li key={val.id} className="list">
                <img
                  src={`https://clube-static.clubegazetadopovo.com.br/${val.logo}`}
                  height={"70px"}
                  alt="_blank"
                />
                <p>
                  Empresa: <br></br>
                  {val.fantasyName}
                </p>
                <p>
                  Desconto: <br></br>
                  {val.discountAmount}%
                </p>
              </li>
            );
          })}
      </ul>
    );
  };

  const ListLoading = List;
  const [searchTerm, setSearchTerm] = useState("");
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
        console.log(repos);
      });
  }, [setAppState]);
  return (
    <div className="App">
      <div className="container">
        <h1>PESQUISADOR DE ESTABELECIMENTOS</h1>
      </div>
      <form>
        <input
          type="text"
          placeholder="Pesquise Algo"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        ></input>
      </form>
      <h2>Estabelecimentos</h2>
      <div className="repo-container">
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  );
}

export default App;
