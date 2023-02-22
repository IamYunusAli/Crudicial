import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { myClient } from './createClient'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

useEffect(()=>{
  getUsers()
})

  async function getUsers(){
    const {data} = await myClient
    .from ('Users')
    .select('*')
    setUsers(data)
  }

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
      <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
      <thead className='bg-gray-50'>
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Id</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Age</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
      </tr>
      </thead>
      <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
      {users.map((user) => (
        <tr key={user.id} className='hover:bg-gray-50'>
          <td className='px-6 py-4'>{user.id}</td>
          <td className='px-6 py-4'>{user.name}</td>
          <td className='px-6 py-4'>{user.age}</td>
          <td>
          </td>
        </tr>))
      }
      </tbody>
    </table>
    </div>
  )
}

export default App
