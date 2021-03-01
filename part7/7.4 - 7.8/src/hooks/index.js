import axios from 'axios'
import { useState } from 'react'

const useResource = (url, action) => {
    const baseUrl = 'url'
    const [data, setData] = useState[]


    switch(action) {
        case GET_ALL:
            console.log('get all resources')
            break
        case 'CREATE':
            console.log('create resource')
    }

    let token = null

    const setToken = newToken => {
    token = `bearer ${newToken}`
    }

    const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => setData[response.data])
    }

    
    const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return setData[response.data]
    }

    return {
        setToken,
        getAll,
        create,
        data
    }
}