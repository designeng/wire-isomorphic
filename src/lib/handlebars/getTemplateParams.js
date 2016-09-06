const paramRegex = /{{([a-zA-Z0-9]+)}}/g;

export default function getTemplateParams(tpl) {
    let templateParams = [];
    let result = tpl.exec(paramRegex);
    while(result) {
        templateParams.push(result[1]);
        result = tpl.exec(paramRegex);
    }
    return templateParams;
}