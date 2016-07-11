// import carcass from '../../templates/build/carcass';

const headerHtml = (cities, currentCity, receptionButtons, specialTitleData, requestUrl) => {
    return header({
        topControls: topControls({
            receptionButtons,
            specialTitleData
        }),
        logo: logo(),
        citySelector: citySelector({
            // TODO: take it from page cookie?
            currentCity: currentCity ? currentCity.name : 'Москва',
            cities
        }),
        nav: nav({
            request: requestUrl
        })
    })
};

function getCarcassFn(brands, cities, requestUrl) {
    
}

export default getCarcassFn;