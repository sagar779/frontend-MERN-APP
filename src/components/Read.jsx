import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {

    try {
      const responce = await fetch(`http://localhost:5000/${id}`,{
        method: "DELETE",
      })
      const result = await responce.json();

      if (!responce.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("Deleted Succesfully");

        setTimeout(() => {
          setError("");
          getData(); // again refreshing the page without the deleted id  
        }, 1000);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching data.");
    }
  };
  

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching data.");
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div className='container my-2'>
      
      <h2 className='text-center'>All Data</h2>
      {error && <div className='alert alert-danger'>{error}</div>}
      <div className='row'>
        {data?.map((ele) => (
             <div key={ele._id} className='col-4'>
             <div className="card">
               <div className="card-body">
                 <h5 className="card-title"> Name: {ele.name} </h5>
                 <h6 className="card-subtitle mb-2 text-muted"> Email: {ele.email} </h6>
                 <p className="card-text">Age: {ele.age}</p>
                 <p className='card-text'> Gender: {ele.gender}</p>
                 <button className='btn btn-secondary' 
                 style={{ marginRight: '10px', backgroundColor: 'black' }}
                 onClick={() => handleDelete(ele._id)}>Delete</button>
                <Link className='btn btn-secondary' 
                style={{backgroundColor:"black"}} 
                to={`/${ele._id}`}>Edit</Link>
               </div>
             </div>
           </div>
         
        ))}
       </div>
    </div>
  );
};

export default Read;

