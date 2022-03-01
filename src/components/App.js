import React, {useEffect, useState} from 'react';


// importing components
import Nav from './Nav.js';
import ListItems from './ListItems'



function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getLastWeeksDate = () => {
    const now = new Date();
  
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString().split('T')[0];
  }
  
  const getFetchUsers = () => {
    let lastWeek = getLastWeeksDate();
    console.log(lastWeek);
    fetch(`https://api.github.com/search/repositories?q=created:%3E${lastWeek}&sort=stars&order=desc`)
     .then(res => res.json())
     .then(result => {
      setData(result.items);
      setLoading(false)
     })
     .catch(console.log);
  }
  useEffect(() => {
    if(loading){
      getFetchUsers();
    }
  }, [])
  return (
    loading === true ?
    (
      <>Loading...</>
    )
    :
    (
      <>
      <Nav />
      <ListItems datas={data}/>
      </>
    )
  );
}

export default App;

