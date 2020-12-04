import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import gson from 'gson';
export default function Home() {
  const [chamadas, setChamadas] = useState('');

  var myObj;
  const [teste, setTeste] = useState('[{"id": 510725, "status_category": "Concluído", "create_date": "datetime.datetime(2020, 10, 1, 5, 0, 53, tzinfo=psycopg2.tz.FixedOffsetTimezone(offset=0, name=None))"}]');
  //const stExe = "Teste 45645";
  //const [result, setResult] = useState('');

 /* async function callPostFetch() {
    // Pra testar o retorno 
    await fetch('atendiment', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: {
        "fields": ["status_category", "create_date", "resolution_date"],
        "start_date": "2020-10-01T03:00:00.000+0000",
        "end_date": "2020-10-01T09:59:59.000+0000"
      }
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }*/
   async function callPost() {
 
     await axios({
       method: 'post',
       headers: { 'Content-Type': 'application/json' },
       url: 'atendiment',
       bady: 'json',
       data: {
         "fields": ["id", "status_category", "create_date"],
         "start_date": "2020-10-01T03:00:00.000+0000",
         "end_date": "2020-10-01T09:59:59.000+0000"
       },
     }).then(function (response) {
       console.log(typeof JSON.parse(teste));
       //console.log(typeof {'test': 1});
       
       //setChamadas(response.data.replace(/[\']/g, /[\"]/g));
       //setChamadas(response.data);
       //console.log(typeof response.data);
       // setResult(JSON.parse(response.data));
       //console.log(result);
       //console.log(typeof {"id": 510725, "status_category": "Concluído", "create_date": "datetime.datetime(2020, 10, 1, 5, 0, 53, tzinfo=psycopg2.tz.FixedOffsetTimezone(offset=0, name=None))"});
      //myObg = response.data.replace(/[\']/g, '"');
      //console.log(typeof myObj);

     })
     .catch(function (error) {
       console.log(error);
     });
   }
   //response.data.replace(/[\']/g, /[\"]/g)
  useEffect(() => {
    //callPostFetch();
    callPost();
  }, []);

  return (
    <div>
      {chamadas}
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

/** Pseudo Código
 1 - Se status != Concuido
         emBacklog++;
 2 - Se status != Concuido
       Se (dateAtual - create_date) >= 2
         OfenSLA++;
 3 - (50/emBacklog) * 100 | (em porcentagem)
 4 - Valor fixo (50)
 5 - Se status = concuido (dentro do dia)
       QtdConcluido++;
       (55/QtdConcluido) * 100 | (em porcentagem)
 6 - QtdConcluido (No dia)
 7 - Se status = concluido | (GRAFICO)
       tempoSem1 += (Date_close - date_create)
 */