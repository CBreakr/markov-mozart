import React from 'react';
import './App.css';

import { useState } from "react";

import chord_data from "./chord_data";

import markov from "./markov";

function App() {

  const [composer, setComposer] = useState(null);
  const [scale, setScale] = useState("");
  const [length, setLength] = useState("");
  const [chain, setChain] = useState(null);

  const changeComposer = (event) => {
    setComposer(null);
    setScale("");
    setLength("");

    chord_data.composers.forEach(comp => {
      if(comp.name === event.target.value){
        setComposer(comp);
        setScale(comp.scales[0].type);
        setLength(3);
        return;
      }
    });
  };

  const changeScale = (event) => {
    setScale(event.target.value);
  };

  const changeLength = (event) => {
    setLength(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();

    if(composer && length !== ""){
      let matrix = composer.scales.filter(val => val.type === scale)[0].values;
      const chain = markov(length, matrix);
      setChain(chain);
    }
    else{
      alert("please choose a composer, scale, and progression length");
    }
  };

  return (
    <div className="App">
      <h1>
        Make a Chord Progression
      </h1>

      <div className="form-container">

        <form className="form">
            <label htmlFor="composer">Composer</label>
            <select id="composer" onChange={changeComposer}>
              <optgroup>
                <option selected={!composer} name="none">Pick a Composer</option>
                {
                  chord_data.composers.map(val => {
                    return <option key={val.name} name={val.name} selected={composer && val.name === composer.name}>{val.name}</option>
                  })
                }
              </optgroup>
            </select>

            <label htmlFor="composer">Scale</label>
            <select id="composer" onChange={changeScale}>
              <optgroup>
                {
                  composer && composer.scales.map(val => {
                    return <option key={val.type} type={val.type} selected={val.name === scale}>{val.type}</option>
                  })
                }
              </optgroup>
            </select>

            <label htmlFor="length">Length</label>
            <input type="number" value={length} onChange={changeLength} />

          <div className="button-container">
            <button onClick={submit}>Create Progression</button>
          </div>
          
        </form>
      </div>

      {
        chain 
        ? <>
          <div className="progression">
            <h3>Chords</h3>
            <div className="chords-container">
              {
                chain.map((chord, index) => {
                  return <span className="chord" key={index}>{chord}</span>
                })
              }
            </div>
          </div>
        </>
        : null
      }
    </div>
  );
};


export default App;
