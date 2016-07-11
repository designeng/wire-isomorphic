import _ from 'underscore';
import * as widgets from './';

const advertisementPlaceholderRegex = /<!--@.*\s(widget_[a-zA-Z0-9]+)\s.*@-->/g;

export function replaceWidgetPlaceholder(html, context) {
    return html.replace(advertisementPlaceholderRegex, function(match, widgetName) {
        let widgetHtml = context.widgetsHash[widgetName];
        return widgetHtml ? widgetHtml : '';
    })
}

// TODO:
// additional regex

// desktop / mobile
const blockModeRegex = /\s(desktop|mobile)\s/g;

// width100 / 320х100 / 960x320 / InRead / button
const blockWidgetDescriptionRegex = /\s(description=.*)\s/g;