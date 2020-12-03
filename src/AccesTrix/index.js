import React from 'react';
import api from '../Services/api';

const fields = "id";
const sDate = "2020-10-01T03:00:00.000+0000";
const cDate = "2020-10-02T02:59:59.000+0000";


async function call() {

    const data = { fields, sDate, cDate };

    api.post('atendiment', data, { auth: { username: "admin", password: "desafiotrixlog2019" } }
    ).then(res => console.log(res))
    ;
}