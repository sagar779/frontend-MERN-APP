import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const nevigate = useNavigate();

  useEffect(() => {
    const getSinghleUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${id}`);
        const result = await response.json();
        
        if (!response.ok) {
          console.log(result);
          setError(result.error); // Use setError without relying on `error`
        } else {
          console.log("Updated user", result);
          setError(""); // Clear the error on success
          setName(result.name);
          setEmail(result.email);
          setAge(result.age);
          setGender(result.gender);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to fetch user data");
      }
    };

    getSinghleUser();
  }, [error ,id]);


  const handleUpdate  = async (e) =>{
    e.preventDefault();

    const updatedUser = {name, email, age, gender};
    
    const responce = await fetch(`http://localhost:5000/${id}`,{
      method: "PATCH",
      body:JSON.stringify(updatedUser),
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
          setError("");
          nevigate("/all")
        }



  }

  return (
    <div className='container mb-2 '>
      
      <h2 className='text-center'> Edit the Data</h2>
     <form onSubmit={handleUpdate}>
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

export default Update
