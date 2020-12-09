import React, { Component } from 'react';
import axios from 'axios';
import 'fontsource-roboto';
import Box from '@material-ui/core/Box';

class App extends Component {

  state = {
    text: '',
    myObject: [],
    backLog: 0,
    ofenSLA: 0,
    desDia: 55,
    text2: '',
    myObject2: [],
    resultDesDay: 0,
  }

  async componentDidMount() {
    // Expressão regular para manipular String para JSON
    const regExp = /'|datetime\.datetime\(|, tzinfo=psycopg2\.tz\.FixedOffsetTimezone\(offset=0, name=None\)\)/gi;

    // Pedido POST para a API pelo AXIOS
    const response = await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'atendiment',
      bady: 'json',
      data: {
        "fields": ["id", "status_category", "create_date"],
        "start_date": "2020-10-01T03:00:00.000+0000",
        "end_date": "2020-10-30T02:59:59.000+0000"
      },
    });

    // Corrigindo string para formato JSON
    this.setState({ text: response.data.replace(regExp, '"') });
    // Corrigindo string para formato JSON
    this.setState({ text: this.state.text.replace(/None/gi, "\"None\"") });
    // Tornando String em JSON
    this.setState({ myObject: JSON.parse(this.state.text) });
    // Verificando as chamadas não concluídas BACKLOG
    var obj = this.state.myObject;
    var contBacklog = 0;
    obj.map(function (item) {
      if (item.status_category !== "Concluído") {
        contBacklog++;
      }
      return null;
    })
    // Setando valor de backlog
    this.setState({ backLog: contBacklog });

    ///////////////////////////////////////////////////////
    var dateCall = [];  // A data separada nos indices | 0 - Ano, 1 - Mes, 2 - Dia, 3 - Hora, 4 - Min, 5 - Segundos
    var now = new Date(); // Data atual | now.getDay() | now.getDate() | now.getMonth()+1 | now.getFullYear()
    
    //                              | Dia da semana (0-6) | Dia Atual | Mes (0-11) | Ano Atual
    //**CREATE_DATA  = 2020, 10, 13, 13, 42, 54
    //               = AAAA, MM, DD, HH, MM, SS

    //Ofensores SLA
    var contOfnSLA = 0;
    var dayFM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // array de dias por mes
    obj.map(function (item) {
      dateCall = item.create_date.split(", "); // [(0)AAAA, (1)MM, (2)DD, (3)HH, (4)MM, (5)SS]
      var actualCall = new Date(dateCall[0], dateCall[1] - 1, dateCall[2], dateCall[3], dateCall[4], dateCall[5] === undefined ? '0' : dateCall[5]); // Converte a data da chamada de string para Date

      if (item.status_category !== "Concluído") {
        //console.log(now.getMonth(), actualCall.getMonth());
        if (now.getMonth() === actualCall.getMonth()) {
          if ((now.getDate() - actualCall.getDate()) >= 2) {
            contOfnSLA++;
          }
        } else if (now.getMonth() > actualCall.getMonth()) { // Da até para tirar, supondo que n é possivel fazer chamadas com data depois da atual
          if (((now.getDate() + dayFM[now.getMonth()]) - actualCall.getDate()) >= 2) {
            contOfnSLA++;
          }
        }
      }
      return null;
    })

    //setando valor de ofensores SLA
    this.setState({ ofenSLA: contOfnSLA });

    const day = 7;
    const month = 10;
    const response2 = await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'atendiment',
      bady: 'json',
      data: {
        "fields": ["id", "status_category", "create_date", "resolution_date"],
        "start_date": "2020-" + month.toString() + "-" + day.toString() + "T03:00:00.000+0000",
        "end_date": "2020-" + month.toString() + "-" + (day + 1).toString() + "T02:59:59.000+0000"
      },
    });
    // Corrigindo string para formato JSON
    this.setState({ text2: response2.data.replace(regExp, '"') });
    // Corrigindo string para formato JSON segunda parte
    this.setState({ text2: this.state.text2.replace(/None/gi, "\"None\"") });
    // Tornando String em JSON
    this.setState({ myObject2: JSON.parse(this.state.text2) });

    var obj2 = this.state.myObject2, resultDay = 0;
    //var cont = 0;
    obj2.map(function (item) {
      if (item.status_category === "Concluído") {
        resultDay++;
        //console.log(++cont);
      }
      return null;
    })
    // Setando valor de backlog
    this.setState({ resultDesDay: resultDay });


  }


  render() {
    const { myObject, backLog, desDia, ofenSLA, resultDesDay } = this.state;
    var resAreaPercent = ((50 / (backLog === 0 ? 50 : backLog)) * 100).toFixed(0);
    var resultDayPercent = ((100 * resultDesDay) / desDia).toFixed(0);
    return (
      <div>
        <Box display="flex" justifyContent="center" m={0}>
          <Box border={1} m={1} p={1}>
            <center>
              <h1>{backLog}</h1>
              <h2>Chamadas em Backlog</h2>
            </center>
          </Box>
          <Box border={1} m={1} p={1}>
            <center>
              <h1>{ofenSLA}</h1>
              <h2>Ofensores de SLA</h2>
            </center>
          </Box>
          <Box border={1} m={1} p={1}>
            <center>
              <h1>{resAreaPercent}</h1>
              <h2>Resultado da área</h2>
            </center>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" m={0}>
          <Box border={1} m={1} p={1}>
            <center>
              <h1>{desDia}</h1>
              <h2>Desafio do Dia</h2>
            </center>
          </Box>
          <Box border={1} m={1} p={1}>
            <center>
              <h1>{resultDayPercent}</h1>
              <h2>Resultado do desafio de hoje</h2>
            </center>
          </Box>
          <Box border={1} m={1} p={1}>
            <center>
              <h1>{resultDesDay}</h1>
              <h2>Chamadas fechadas hoje</h2>
            </center>
          </Box>
        </Box>




      </div>

    );
  }
}

export default App;


/** Pseudocódigo
 ------1 - Se status != Concuido
         emBacklog++;
 ------2 - Se status != Concuido
       Se (dateAtual - create_date) >= 2
         OfenSLA++;
 ------ 3 - (50/emBacklog) * 100 | (em porcentagem)
 ------ 4 - Valor fixo (50)
 5 - Se status = concuido (dentro do dia)
       QtdConcluido++;
       (100*tdConcluido) / 55 | (em porcentagem)
 6 - QtdConcluido (No dia)
 7 - Se status = concluido | (GRAFICO)
       tempoSem1 += (Date_close - date_create)
 */

/**
 *
    <div>
        <ol type="1">
          <li> Chamadas em Backlog: {backLog} </li>
          <li> Ofensores de SLA: {ofenSLA} </li>
          <li> Resultado da área: {resAreaPercent}% </li>
          <li> Desafio do dia: {desDia} </li>
          <li> Resultado do desafio de hoje: {resultDayPercent}%</li>
          <li> Chamadas fechadas hoje: {resultDesDay} </li>
        </ol>
      </div>

       <ol type="1">
          {myObject.map(item => (

            <li key={item.id}>{item.create_date}</li>

          ))}
        </ol>
 */