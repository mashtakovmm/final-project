import React from 'react';
import DeleteButton from './DeleteButton';
import OpenButton from './OpenButton';
import { useState, useEffect } from 'react';
import "./Table.css"

function OfficersTable() {
  const [data, setData] = useState([])
  const [deletedId, setDeletedId] = useState(null);
  const token = localStorage.getItem('token')


  function getAllReports() {
    if(token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let fetchData;

      fetch("https://sf-final-project-be.herokuapp.com/api/officers/", requestOptions)
      .then(response => response.json())
      .then(result => {
          fetchData = result.officers;
          setData(fetchData.map(obj => ({ id:obj._id, email: obj.email, approved: obj.approved })));
      })
      .catch(error => console.log('error', error));
    }
}


  useEffect(() => {
    getAllReports()
  }, [deletedId]);

  function handleDelete(id) {
    console.log(`Удалить запись с id: ${id}`);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, requestOptions)
      .then(response => {
        if (response.ok) {
          setDeletedId(id);
        }
    })
    .catch(error => console.log('error', error));
  }

  function handleOpen(id) {
    console.log(`Открыть запись с id: ${id}`);
  }

  return (
    <table className='table'>
        <thead className='thead'>
        <tr className='tr'>
            <th className='th' key="0">Email</th>
            <th className='th' key="1">Approved</th>
            <th className='th' key="2"></th>
            <th className='th' key="3"></th>
        </tr>
        </thead>
      <tbody className='tbody'>
        {data.map((item) => ( 
          <tr className='tr' key={item.id}>
            <td className='td' >{item.email}</td>
            <td className='td'>{item.approved ? <span>&#10003;</span> : <span>&#10005;</span>}</td>
            {/* <td className='td' >{<OpenButton id={item.id} onClick={handleOpen}/>}</td> */}
            <td className='td' >{<OpenButton id={item.id} type="officers"/>}</td>
            <td className='td' >{<DeleteButton id={item.id} onClick={handleDelete}/>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OfficersTable;
