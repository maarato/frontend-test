import React from 'react';
import TaskItem from './TaskItem';
import {fetchTodoData,groupByUser} from '../util/Util';
import './TodoContainer.css';

class TodoContainer extends React.Component{

    state = {
        elemetsToDisplay:[],
        dataGrouped:[],
        currentPage:1,
        labelToDisplay:"",
        pageIndex: []
    }

    async componentDidMount(){
        const dataItems = await fetchTodoData();
        let pageIndex = [];
        const dataGrouped = groupByUser(dataItems);
        for(let userId in dataGrouped){
            pageIndex.push(
                <div className="userSelectorElement"  onClick={this.handleChangePage} key={userId} data-value={userId}>User {userId}</div>
            );
        }
        this.setState({dataGrouped,pageIndex})
        if(!this.getUserItems(this.state.currentPage))
            this.setState({labelToDisplay:"No data available"})
    }

    handleChangePage = (e) => {
        this.getUserItems(e.target.attributes["data-value"].value);
    }

    getUserItems = (userId) => {
        if(this.state.dataGrouped == null )
            return false;
        let pendingTasks = [] , completedTasks = [];
        for(let task of this.state.dataGrouped[userId]){
            if(task.completed)
                completedTasks.push(<TaskItem 
                        reloadList = {this.getUserItems}
                        reff = {task}
                        key = {task.id}
                        completed={task.completed} 
                        id={task.id}
                        title={task.title}
                        userId={task.userId}
                />);
            else {
                pendingTasks.push(<TaskItem 
                    reloadList = {this.getUserItems}
                    reff = {task}
                    key = {task.id}
                    completed={task.completed} 
                    id={task.id}
                    title={task.title}
                    userId={task.userId}
            />);
            }
        }

        let newElemetsToDisplay = 
            <div className="tasksContainer">
                <div>{pendingTasks}</div>
                <div>{completedTasks}</div>
            </div>;
        this.setState({elemetsToDisplay:newElemetsToDisplay, currentPage:userId,labelToDisplay:"User " +userId});   
        return true;
    } 

    

    render(){

        return (
            <div className="TodoContainer">
                <div className="currentUserLabel">
                    <h2>{this.state.labelToDisplay}</h2>
                </div>
                <div className="pageIndex">
                    {this.state.pageIndex}
                </div>
                {this.state.elemetsToDisplay}
            </div>
        );
    }

}

export default TodoContainer;