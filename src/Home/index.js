import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [lero, setlero] = useState('');
  const [myObject, setMyObject, Component] = useState(["Um", "2", "Três", "4"]);
  //var myObject;"
  async function callPost() {

    await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'atendiment',
      bady: 'json',
      data: {
        "fields": ["id", "status_category", "create_date", "resolution_date"],
        "start_date": "2020-10-01T03:00:00.000+0000",
        "end_date": "2020-10-30T02:59:59.000+0000"
      },
    }).then(function (response) {

      const regExp = /'|datetime\.datetime\(|, tzinfo=psycopg2\.tz\.FixedOffsetTimezone\(offset=0, name=None\)\)/gi;
      setlero(response.data.replace(regExp, '"'));
      //setlero(lero.replace(/None/gi, "\"None\""));
      
      //console.log(lero.match(/\{.+?\}/gi));
      setMyObject(lero.match(/\{.+?\}/gi));
      //myObject = JSON.parse(lero);
      console.log(myObject);

    })
      .catch(function (error) {
        console.log(error);
      });
  }

 
  useEffect(() => {
    callPost();
  }, []);

  return (
    <div>
      <h1>Teste 374</h1>
      {myObject.map(item => (
          <li>
            <p>{item}</p>
          </li>
        ))}
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