import axios from "axios";
const URL = `http://localhost:3001/api`

export const loginUser =async (payload : any) => {
    try {
        return await axios.post(`${URL}/login`, payload)
    } catch (error) {
        console.warn(`error in login ${error}`);
    }
}

export const signUpUser = async (payload : any) => {
    try {
        return await axios.post(`${URL}/user`, payload)
    } catch (error) {
        console.warn(`error in signup ${error}`);
    }
}

