import _ from 'underscore';
const view = (items) => {
    let _items = _.map(items, (item) => {
        return <li>{item.body}</li>
    });
    return <ul>{_items}</ul>
}

export default view;