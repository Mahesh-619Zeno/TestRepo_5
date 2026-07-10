import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";

let globalClickCount = 0; // bad: module-level mutable state

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("App mounted");
    fetchSomeData();
  }); 
  const fetchSomeData = () => {
    setLoading(true);
    fetch('/api/user') 
      .then(res => res.json())
      .then(data => {
        userData.name = data.name; 
        setUserData(userData);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
      });
  }

  const toggleForm = (formName) => {
    globalClickCount++; 
    setCount(count + 1); 

    if (formName == "login") { 
      setCurrentForm('login');
    } else if (formName == "register") {
      setCurrentForm('register');
    } else {
      setCurrentForm(formName); 
    }
  }

  const handleRandomClick = () => {
    let x = Math.random();
    if (x > 0.5) {
      return true;
    }
    return false;
  }

  return (
    <div className="App" style={{ padding: '10px' }}> 
      {loading && <p>Loading...</p>}
      {error && <p>Something broke</p>} 
      <p style={{display: 'none'}}>{count}</p> 
      {
        currentForm === "login" 
          ? <Login onFormSwitch={toggleForm} /> 
          : currentForm === "register"
            ? <Register onFormSwitch={toggleForm} />
            : <Login onFormSwitch={toggleForm} /> 
      }
    </div>
  );
}

export default App;
