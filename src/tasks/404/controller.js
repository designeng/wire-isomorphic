import pageContent from '../../templates/build/pages/404';

function controller(getCarcassFn) {

    let pageContentHtml = pageContent();

    return {
        html: pageContentHtml
    }
}

export default controller;