import React from 'react'
import './Poppular.css'
 
import Item from '../Item/Item'

const Poppular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
        .then((response) => response.json())
        .then((data) => setPopularProducts(data));
}, []);

  return (
    <div className='poppular'>
      <h1>POPPULAR IN WOMEN</h1>
      <hr />
      <div className='poppular-item'>
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Poppular
