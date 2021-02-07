import React, { useState, useEffect } from 'react';

function App() {
  const [bacon, setBacon] = useState(null);
  const[items, setItems] = useState(null)

  useEffect(() => {

      fetch('/products')
      .then(res => res.json())
      .then(data => setItems(data.data));

  }, []);

  console.log(items)


  return (
    <>
    { items && 
    <>
    {items.map(item => 
    <div>
    {item.name}
    <img src={item.imageSrc} />
  </div>)}
    </>

    }
    </>
  )
}

export default App;
