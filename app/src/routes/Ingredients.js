import React, { useEffect, useState } from 'react';
import { getData } from '../utils/data';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export default function Ingredients() {
  const ENDPOINT = 'Ingredients';
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    let data = getLocalStorage(ENDPOINT);
    if (data.length > 0) {
      setIngredients(data);
    }
    else {
      getData(ENDPOINT)
        .then((data) => {
          setIngredients(data);
          setLocalStorage(ENDPOINT, data);
        })
    }
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="container">
        <div className="row justify-content-center text-center">
          <h2 className='mb-4'>Ingredients</h2>
          <table className="table table-hover" style={{ maxwidth: '600px' }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, idx) => <Ingredient key={ingredient.id} idx={idx} ingredient={ingredient} />)}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

const Ingredient = ({ idx, ingredient }) => {
  return (
    <tr className='col-3'>
      <td>{idx}</td>
      <td>{ingredient.name}</td>
    </tr>
  )
}