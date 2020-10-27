export async function fetchTodoData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const allTasks = await res.json();
    return allTasks;
}

export function groupByUser(taskData) {
    if (!taskData || Object.keys(taskData).length === 0 )
        return null;
    let dataGrouped = {};
    for (let task of taskData){
        if(!task.userId)
            continue;
        if(!dataGrouped[task.userId])
            dataGrouped[task.userId]=[];
        dataGrouped[task.userId].push(task);
    }
    return dataGrouped;
}