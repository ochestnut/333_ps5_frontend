/*This allows jest to work with react.*/
module.exports = {
    presets: ['@babel/preset-env', ['@babel/preset-react', {
        //This deals with "React is not defined" error. Pulled from React17 Documentation.
        "runtime": "automatic"
    }]
    ]
}
