import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  // const [data,setData] = useState([])
  const {id} = useParams();
  const [values,setValues] = useState({
      name: '',
      email: '',
      phone: '',
      status:''
  })
  const navigate = useNavigate(); 
  useEffect(()=>{
     axios.get(`http://127.0.0.1:8000/api/users/${id}`)
     .then(res => {
      setValues(res.data);
    })
     .catch(err => console.log(err));
  },[])

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/users/${id}`, values)
     .then(res => {
      console.log(res);
      navigate('/')
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-100 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
            <div className='mb-2'>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" className='form-control' placeholder='Enter Name'
                value={values.name} onChange={e=>setValues({...values, name: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" className='form-control' placeholder='Enter Email'
                 value={values.email} onChange={e=>setValues({...values, email: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="phone">Phone:</label>
                <input type="text" name="phone" className='form-control' placeholder='Enter Phone'
                  value={values.phone} onChange={e=>setValues({...values, phone: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="phone">Status:</label>
            <select
              className="form-control"  value={values.status} onChange={e=>setValues({...values, status:e.target.value})}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            </div>
            <button className='btn btn-success'>Submit</button>
            <Link to="/" className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  )
}

export default Update
