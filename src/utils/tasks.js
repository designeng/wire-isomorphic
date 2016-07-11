import _ from 'underscore';
import rootWire from 'essential-wire';

export function createTask(task) {
    return (context) => {
        return context ? context.wire(task) : rootWire(task);
    }
}

export function createTasks(tasks) {
    return _.map(tasks, (task) => {
        return createTask(task);
    })
}