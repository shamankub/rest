import React from 'react'


class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', project: props.projects[0].id, creator: props.users[0].uuid }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createTODO(this.state.text, this.state.project, this.state.creator)
        //console.log(this.state.project)
        //console.log(this.state.text)
        //console.log(this.state.creator)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="project"> Project </label>
                    <select name="project" className='form-control' onChange={(event) => this.handleChange(event)}> {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)} </select>
                </div>
                <div className="form-group">
                    <label for="login"> Text </label>
                    <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="creator"> Creator </label>
                    <select name="creator" className='form-control' onChange={(event) => this.handleChange(event)}> {this.props.users.map((item) => <option value={item.uuid}>{item.username}</option>)} </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default TODOForm
