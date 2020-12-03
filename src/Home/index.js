import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import api from '../Services/api';

export default function Home() {
  const [chamadas, setChamadas] = useState('');

  /* async function callGet() {
     // Pra testar o retorno 
     await axios({
       method: 'get',
       headers: { 'Content-Type': 'application/json' },
       url: 'atendiment',
       data: '',
     }).then(function (response) {
       console.log(response);
     });
   }*/
  async function callPost() {

    await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'atendiment',
      data: {
        "fields": ["status_category", "create_date", "resolution_date"],
        "start_date": "2020-10-01T03:00:00.000+0000",
        "end_date": "2020-10-02T02:59:59.000+0000"
      },
    }).then(response => {
      const lerolero = [...response.data];
      console.log(lerolero);
      setChamadas(lerolero);
      //console.log(response.data);
      ;
    })
  }

  useEffect(() => {
    //callGet();
    callPost();
  }, []);

  return (
    <div>
      <h1>Testes 2</h1>
      <ul>
      {chamadas}
          
      </ul>
    </div>
  );
}

/**
{chamadas.map(item => (
          <li key={item.id}>
            <p>{item}</p>
          </li>
        ))}
 */