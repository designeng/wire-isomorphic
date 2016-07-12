import _ from 'underscore';

export default {
    $plugins: [
    ],

    brands: ['paris', 'london', 'moscow'],

    response: {
        create: {
            module: (brands) => {
                return JSON.stringify({items: _.map(brands, (value) => {
                        return {
                            name: value.toUpperCase(),
                            id: value
                        }
                    })});
            },
            args: [
                {$ref: 'brands'},
            ]
        }
    }
}