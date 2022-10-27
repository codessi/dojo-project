import{Link} from 'react-router-dom'
import Avatar from './Avatar'
import './ProjectList.css'

export default function ProjectList({ projects }) {
    // console.log(projects)
  return (
    <div className='project-list'>

      {projects.length === 0 ? (
        <p>There is no project yet!</p>
      ) : (
        projects.map((project) => {
          return( 
          <Link key={project.id} to={`/projects/${project.id}`}>
              <h4 >{project.name}</h4>
              <p> Due by: {project.dueDate.toDate().toDateString()}</p>
              <div className='assigned-to'>
                <ul>
                {project.assignedUsersList.map(user => {
                    return (
                     <li key={user.id}>
                        <Avatar src={user.photoURL} /> 
                     </li>
                    )
                })}</ul>
              </div>

          </Link>
          )
        })
      )}
    </div>
  )
}
