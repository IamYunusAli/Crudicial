import { useEffect, useState } from 'react'
import { myClient } from './createClient'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({name:'', age:''})
  const [user2, setUser2]=useState({name:'', age:''})
  useEffect(()=>{
  getUsers()
})

  async function getUsers(){
    const {data} = await myClient
    .from ('Users')
    .select('*')
    setUsers(data)
  }

  async function createUser(e) {
    e.preventDefault()
    await myClient
    .from('Users')
    .insert({name:user.name, age:user.age})
    getUsers()
  }

  async function deleteUser(id) {
    await myClient
    .from('Users')
    .delete()
    .match({id})
    getUsers()
  }

  const handleChange = (e) => {
    setUser(
      {...user,
        [e.target.name]: e.target.value})
  }

  const handleChange2 = (e)=>{
    setUser2((prevData)=>{
      return{
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  async function updateUser(id) {
    await myClient
    .from('Users')
    .update({id: user2.id, name:user2.name, age:user2.age})
    .eq('id', id)
    myClient()
  }

  const displayUser = (id) => {
    users.map((user) => {
      if(user.id === id){
        setUser2({
          id: user.id,
          name: user.name,
          age: user.age,
        })
      }
    })
  }

  return (
    <div className="w-full m-5">
    <form onSubmit={createUser}>
      <input className='border-2 rounded-lg border-gray px-5 py-2 m-5' type="text" name="name" onChange={handleChange} placeholder="name"/>
      <input className='border-2 rounded-lg border-gray px-5 py-2 m-5' type="number" name="age" onChange={handleChange} placeholder="age"/>
      <button className='rounded-lg px-9 py-2 m-3 bg-green-400' type="submit">Add</button>
    </form>
    <form onSubmit={()=>(updateUser(user2.id))}>
      <input className='border-2 rounded-lg border-gray px-5 py-2 m-5' type="text" name="name" onChange={handleChange2} placeholder="name" defaultValue={user2.name}/>
      <input className='border-2 rounded-lg border-gray px-5 py-2 m-5'type="number" name="age" onChange={handleChange2} placeholder="age" defaultValue={user2.age}/>
      <button className='rounded-lg px-9 py-2 m-3 bg-blue-400' type="submit">update</button>
    </form>
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
            <button className='rounded-lg px-9 py-2 m-3 bg-red-400 text-black text-md' onClick={()=>(deleteUser(user.id))}>Delete</button>
            <button className='rounded-lg px-9 py-2 m-3 bg-yellow-300 text-black text-md' onClick={()=>(displayUser(user.id))}>Edit</button>

          </td>
        </tr>))
      }
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default App
