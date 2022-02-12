import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.users.join('; ')}
            </td>
            <td><button onClick={() => deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
            <table class="projectlist">
                <th>
                    Name
                </th>
                <th>
                    Repository
                </th>
                <th>
                    Users
                </th>
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create Project</Link>
        </div>
    )
}


export default ProjectList
