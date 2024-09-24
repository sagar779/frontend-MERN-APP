import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [age, setAge] = useState();
      const [gender, setGender] = useState("");
      const [error,setError] = useState("");

      const nevigate = useNavigate();
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const addUser = {name, email, age ,gender}

        const responce = await fetch("http://localhost:5000",{
          method:"POST",
          body:JSON.stringify(addUser),
          headers:{
            "content-Type" :"application/json",
          }
        });

        const result = await responce.json();
        
        if(!responce.ok){
          console.log(result.error);
          setError(result.error);
        }

        if(responce.ok){
          console.log(result);
          setError("");
          setName("");
          setEmail("");
          setGender("");
          setAge(0);
          nevigate("/all")
        }

      }

      console.log(name,email,age,gender);
  return (
    <div className='container mb-2 '>
      {error && <div class="alert alert-danger">{error} </div> }
      <h2 className='text-center'> Enter the Data</h2>
     <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label  className="form-label">Name</label>
            <input 
            type="text" 
            className="form-control"   
            value={name} 
            onChange={(e) =>
            setName(e.target.value)
            }/>
            </div>

          <div className='mb-3'>
          <label  className="form-label">Email address</label>
            <input 
            type="text" 
            className="form-control"   
            value={email} 
            onChange={(e) => setEmail(e.target.value) }/>
          

          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input 
            type="number" 
            className="form-control" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="mb-3">
            <label  className="form-label">Gender</label>
            <select 
            className="form-control" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
           </select>
          </div>

          <button type="submit" className="btn btn-primary" >Submit</button>
</form>

      
    </div>
  )
}

export default Create
