import { render } from './view'

export default function compareHandler(app, route) {
    return function(request, response, next) {
        response.send('compare')
    }
}