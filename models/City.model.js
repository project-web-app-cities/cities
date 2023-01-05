const { Schema, model } = require('mongoose');

const citySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name of the city is required'],
            unique: true
        },
        country: {
            type: String,
            required: [true, 'Name of the country is required'],
        },
        language: {
            type: Array,
            required: [true, 'Please select language(s)']
        },
        description: String,
        picture: String,
        attractions: Array

    },
    {
        timestamps: true
    }
);

module.exports = model('City', citySchema);