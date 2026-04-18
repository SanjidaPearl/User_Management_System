import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DashboardStats from './DashboardStats';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(
      `http://127.0.0.1:8000/api/users?page=${page}&search=${search}`
  )
   .then(res => {
     setData(res.data);
   })
    .catch(err => console.log(err));
  }, [search, page]);
  
  const handleDelete = (id)=>{
    const confirm = window.confirm("Would you like to Delete?")
    if(confirm){
     axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
     .then(res => {
      location.reload();
     })
     .catch(err => console.log(err));
    }
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <DashboardStats/>
      <h1>List of Users</h1> 
      <div className='w-100 rounded bg-white border shadow p-4'>
        <input type="text" className="form-control mb-3" placeholder="Search by name, email or phone..."
         onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
           }}
/>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Add +</Link>
        </div>
        
             <table className='table table-striped'>
              <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data.data?.map((d, i) => (
                    <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>{d.phone}</td>
                        <td>
                         <span className={ d.status === 'active' ? 'badge bg-success'  : 'badge bg-danger' }>
                         {d.status} </span>
                        </td>
                        <td>
                          <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                          <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                          <button onClick={e=>handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                  ))
                }
              </tbody>
             </table>
             <div className="d-flex justify-content-center mt-3">
               <button className="btn btn-primary me-2" disabled={data.current_page === 1} 
               onClick={() => setPage(page - 1)}>
                  Previous
              </button>
               <span className="align-self-center">
                     Page {data.current_page} of {data.last_page}
              </span>
              <button className="btn btn-primary ms-2" disabled={data.current_page === data.last_page}
              onClick={() => setPage(page + 1)}>
                    Next
             </button>
            </div>
      </div>
    </div>
  )

}

export default Home