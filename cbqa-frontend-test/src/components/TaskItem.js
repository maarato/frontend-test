import React from 'react';
import './TaskItem.css';

class TaskItem extends React.Component{

    state = {
        completed: this.props.completed,
        id: this.props.id,
        title: this.props.title,
        userId: this.props.userId,
        cssStyle: this.props.completed? "completed":"pending"
    }

    handleToggleStatus = () =>{
        this.props.reff.completed = !this.props.reff.completed;
        this.props.reloadList(this.state.userId);
    }

    render(){
        return (
            <div className={this.state.cssStyle}>
                <input onChange={this.handleToggleStatus} 
                    type="checkbox"
                    name="completed" 
                    className="completedCheck" 
                    checked={this.state.completed}/>
                <p>{this.state.title}</p>
            </div>
        );
    }

}

export default TaskItem;