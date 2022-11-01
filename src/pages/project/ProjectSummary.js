import Avatar from './../../components/Avatar'
import {useAuthContext} from './../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'


export default function ProjectSummary({project}) {

    const {user} = useAuthContext()
    const {deleteDocument,response} = useFirestore("projects")
    const history = useHistory()


  const handleDelete = () => {
   deleteDocument(project.id)
    history.push('/')  
  }
 
  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p>By {project.createdBy.displayName}</p>
            <p className="due-date">
                Project Due By: {project.dueDate.toDate().toDateString()}
            </p>
            <p className="details">
              {project.details}
            </p>
            <h4>Project is assigned to:</h4>
            {project.assignedUsersList.map(user=> {
                return (
                    <div key={user.id}>
                        {/* <img src={user.photoURL} alt="" /> */}
                        <Avatar src={user.photoURL} />
                    </div>
                )
            })}
        </div>
        {user.uid === project.createdBy.id &&
          <button className='btn' onClick={handleDelete}>Delete</button>
             }
       
    </div>
  )
}
