import _ from 'underscore';
const view = (items) => {
    let _items = _.map(items, (item) => {
        return <li><span>{item.title}</span> - <span>{item.created}</span></li>
    });
    return <ul>{_items}</ul>
}

export default view;