// styles
import { useState } from "react"
import "./Create.css"
import Select from 'react-select'
import { useCollection } from "../../hooks/useCollection"
import { useEffect } from "react"
import { timestamp } from "../../firebase/config"
import {useAuthContext }from "./../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import {useHistory} from 'react-router-dom'

export default function Create() {
  const history  = useHistory()
  const {documents } = useCollection('user')
  const {user} = useAuthContext()
  const {addDocument, response} = useFirestore('projects')

  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [details, setDetails] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  const categories = [
    {value: 'development', label:'Development'},
    {value: 'design', label:'Design'},
    {value: 'sales', label:'Sales'},
    {value: 'marketing', label:'Marketing'},
  ]

  useEffect(()=> {
    if (documents){
      const option = documents.map(user => {
       return { value: user , label: user.displayName}
      })
      setUsers(option)
    }
  
  }, [documents])


  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormError(null)
    if(!category){
      setFormError("please select a category.")
      return
    }
    if(assignedUsers.length < 1){
      setFormError("please assign at least one user")
    }
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }

 
    const assignedUsersList = assignedUsers.map(u=> {
      return {   displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,}
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comment: [],
      createdBy,
      assignedUsersList

    }
    await addDocument(project)
    if(!response.error){
      history.push('/')
    }

  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          ></Select>
        </label>
        <label>
          <span>Assign to:</span>
          <Select
          options={users}
          onChange={(option) => setAssignedUsers(option)}
          isMulti

          ></Select>
        </label> 
        {formError && <p className="error">{formError}</p>}
        <button type="submit" className="btn">Add Project </button>
       
      </form>
    </div>
  )
}
