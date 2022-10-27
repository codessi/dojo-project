import Avatar from './../../components/Avatar'

export default function ProjectSummary({project}) {

    // console.log("project",project)
  return (
    <div>
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
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
    </div>
  )
}
