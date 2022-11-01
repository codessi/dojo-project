// styles
import "./Dashboard.css"

import { useCollection } from "./../../hooks/useCollection"
import { useState } from "react"

import ProjectList from "../../components/ProjectList"
import ProjectFilter from "./ProjectFilter"
import { useAuthContext } from "../../hooks/useAuthContext"


export default function Dashboard() {
  const { documents, error } = useCollection("projects")
  const [filter, setFilter] = useState("all")

  const {user} = useAuthContext()

  const changeFilter = async(newFilter) => {
    await setFilter(newFilter)
   
  }
 console.log("filter", filter)

const filteredDoc = documents && documents.filter( document => {
   if (filter === "all")return true
 if (filter==="mine" && user.uid === document.createdBy.id) return true
   if (document.category === filter) return true
})

  return (
    <div style={{ border: "dotted" }}>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      { documents && <ProjectFilter changeFilter={changeFilter} />}
      {filteredDoc  && <ProjectList projects={filteredDoc} />}
    </div>
  )
}
