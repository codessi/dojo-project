import React from 'react'
import { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({changeFilter}) {
    const [currentFilter, setCurrentFilter] = useState("all")

    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }
    // when dev.. project.

  return (
    <div className='project-filter'>
        <nav>
            <p>Filter by: </p>
            {filterList.map(filter => (
                <button key={filter}
                onClick={() => handleClick(filter)}
                className= {currentFilter === filter ? "active":""}
                >
                    {filter}
                </button>
            ))}
        </nav>
    </div>
  )
}
