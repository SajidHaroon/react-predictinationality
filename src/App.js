//Source: https://nationalize.io/
//Example https://api.nationalize.io/?name=michael

import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import lookup from 'country-code-lookup' //npm install country-code-lookup----check also from usage instructions from npmjs website for this package

const App = () => {

  const [result,setResult] = useState('')
  const [name, setName] =useState('')
  const [error, setError] = useState('')


  useEffect (()=>{
    fetchingData()
  },[name])

  const fetchingData = async () => {    // without async/await , promise is waiting is shown
    if (name){
    const data = await axios.get(`https://api.nationalize.io?name=${name}`)
    console.log('data is',data)
    setResult(data.data.country)
    }else{
      console.log('No name to fetch')
    }
  }    

  const handleClick = () =>{
    setError('')
    console.log("button clicked")
    console.log('Country name ', result)
    const searchInput =  document.getElementById('input-box').value
    //console.log('name value is ', searchInput.value)
    if (searchInput) {
      setName(document.getElementById('input-box').value)
    } else {
      setError('Please Enter a name.')
    }
    
    document.getElementById('input-box').value=''
    //setName(searchInput.value)
  }

  const ConvertToCountry=({r})=>{
    const res= lookup.byIso(r.country_id) 
    const prob = r.probability.toFixed(2);
    return(
      <div className="App">
        <p>{res.country} {prob}</p> 
      </div>
    )
  }

  const Display = ({error,result}) => {
    return(
      <div className="display-country">
        {console.log("Displayed result is",result)}
        
        {result && (result.length > 0 ?
            result.map((res,id) => res.country_id !== "" ? <ConvertToCountry key={id} r={res}/> : null)
          :  // Else
            <p>No result found.</p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Predict the nationality by entering the name...</h1>
      <hr/>
      <div className="wrapper">
        <input type="text" placeholder="Enter a name..." id="input-box" required/>
        <button onClick={handleClick}>Check Nationality</button>
        <br/>
        {result.length > 0 ?
        <h4>The country-wise {result.length === 1 ? `probability for "${name}" is`: `probabilities for "${name}" are`}: </h4>
        :
        null
        }
      </div>
      <Display result={result} error={error}/>
    </div>
    

  
  )
}

export default App;