import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Banner from './Components/Banner';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import MealItemList from './Components/FoodAndDrinkStuff/MealItemList';
import DrinkItemList from './Components/FoodAndDrinkStuff/DrinkItemList';
import About from './Components/About/About';


function App() {

  const [items, setItems] = useState([])

  useEffect( () => {fetch(`http://localhost:3000/breakfast`)
  .then(r => r.json())
  .then(setItems)
  },[])

  function handleAddItem(newItem) {
    fetch(`http://localhost:3000/breakfast`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(newItem)
    })
    .then(r => r.json())
    .then((newItem) => {
      const newItems = [...items, newItem]
      setItems(newItems)
    })
  }

  function handleDeleteItem(deletedItem) {
    fetch(`http://localhost:3000/breakfast/${deletedItem.id}`, {
      method : "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const newItems = items.filter(item => item.id !== deletedItem.id)
      setItems(newItems)
    })
  }


  const mealItems = items.filter(item => item.type === 'meal')
  const drinkItems = items.filter(item => item.type === 'drink')
 
  return (
    <div>
      <Banner />
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/meals'>
          <MealItemList 
          items = {mealItems}
          onAddItem = {handleAddItem}
          onDeleteItem = {handleDeleteItem}
           />
        </Route>
        <Route path='/drinks'>
          <DrinkItemList 
          items = {drinkItems} 
          onAddItem = {handleAddItem}
          onDeleteItem = {handleDeleteItem}
          />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
