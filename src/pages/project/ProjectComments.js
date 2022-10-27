import React, { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("")
  const { updateDocument, response } = useFirestore("projects")

  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    }
    // const NewDocument = {...project,project.comment}

    await updateDocument(project.id, {
      comment: [...project.comment, commentToAdd],
    })
    console.log("response", response)
    if (!response.error) {
      setNewComment("")
    }
  }

  return (
    <div className="project-comments">
        <h4>Project Comments</h4>

        <form className="add-comment" onSubmit={handleSubmit}>
          <label>
            <span>Add new comment:</span>
            <textarea
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </label>
          <button className="btn" type="submit">
            Add Comment
          </button>
        </form>
    </div>
  )
}
