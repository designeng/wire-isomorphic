import _ from 'underscore';
import mongoose from 'mongoose';

import Thing from '../../../models/Thing';

export default {
    $plugins: [
    ],

    brands: ['acura', 'bmw', 'ford'],

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
    },

    brandsFromDB: {
        create: {
            module: () => {
                var callback = (err) => {
                    if(err) {
                        return console.log('ERROR', err);
                    } else {
                        console.log('saved');
                    }
                }

                var m = new Thing;
                m.name = 'Statue of Liberty';
                m.age = 35;
                m.updated = new Date;
                m.binary = new Buffer(0);
                m.living = false;
                m.mixed = { any: { thing: 'i want' } };
                m.markModified('mixed');
                m._someId = new mongoose.Types.ObjectId;
                m.array.push(1);
                m.ofString.push("strings!");
                m.ofNumber.unshift(1,2,3,4);
                m.ofDates.addToSet(new Date);
                m.ofBuffer.pop();
                m.ofMixed = [1, [], 'three', { four: 5 }];
                m.nested.stuff = 'good';
                m.save(callback);
            },
        }
    }
}