import axios from "axios";
const URL = `http://localhost:3001/api`

const authToken: any = JSON.parse(localStorage.getItem("token") || '{}')

export const createExpense = async(payload:any) => {
    console.log(payload)
    try {
        return await axios.post(`${URL}/expense`, payload, {
            headers: {
                authorization: authToken,
            }
        })
        
    } catch (error) {
        console.warn(`Error While Creating Expense ${error}`);
        
    }
}

export const retrieveExpense = async() => {
    try {
        return await axios.get(`${URL}/expense`, {
            headers: {
                authorization: authToken,
              }
        })
    } catch (error) {
        console.warn(`error while retrieve Expense from database ${error}`)
    }
}

export const retriveOneExpense = async(id:string | undefined) => {
    try {
       return await axios.get(`${URL}/expense/${id}`,{
            headers:{
                authorization: authToken,
            }
        })
        
    } catch (error) {
        console.warn(`error while retrieve single Expense from database${error}`);
    }
}

export const updateExpense = async ( id:string | undefined , payload: any) => {
    console.log(payload);
    try {
        return await axios.put(`${URL}/expense/${id}`, payload , {
            headers:{
                authorization: authToken,
            }
        })
        
    } catch (error) {
        console.warn(`error while updating Expense in database ${error}`);
        
    }
}

export const deleteExpense = async (id:string | undefined) => {
    try {
        return await axios.delete(`${URL}/expense/${id}`, {
            headers: {
                authorization: authToken
            }
        })
        
    } catch (error) {
        console.warn(`error while deleting Expense from database ${error}`);
        
    }
}

export const serchExpense = async (payload : string) => {
    try {
        return await axios.get(`${URL}/search/${payload}`, {
            headers:{
                authorization: authToken
            }
        })
        
    } catch (error) {
        console.warn(`error while calling search expense ${error}`)
    }
}