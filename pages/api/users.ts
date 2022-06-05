import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

    if (req.method =='GET') {
        const response = await axios.get('http://localhost:8080/api/v1/users')
        res.json(response.data)
        return 
    }


    if (req.method == "POST") {
        const user = validate(req.body)

        const callResult = await axios.post('http://localhost:8080/api/v1/users', user, {
            headers: {
                "content-type": 'application/json'
            }
        })

        console.log(callResult.data)
        res.redirect('/users')
        return
    }

}

const validate = (body: any): User  => {
    const { id, firstName, lastName, email, password } = body

    return {
        id,
        firstName,
        lastName,
        email,
        password
    }
}