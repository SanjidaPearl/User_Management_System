import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function DashboardStats() {
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    inactive_users: 0,
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/dashboard-stats')
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <h4>Total Users</h4>
            <h2>{stats.total_users}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <h4>Active Users</h4>
            <h2>{stats.active_users}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center">
            <h4>Inactive Users</h4>
            <h2>{stats.inactive_users}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardStats;
