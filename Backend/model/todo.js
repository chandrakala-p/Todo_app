const mongoose = require("mongoose");


const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title of todo is required"],
            maxLength: [30, "Maximum length of title is 30 charecters"]
        },
        color: {
            type: String

        },
        date: {
            type: Date,
            default: Date.now
        },
        tasks: [{
            main: String,
            checked: {
                type: Boolean,
                default: false,
            },
            taskcreatedat: {
                type: Date,
                default: Date.now
            },
            taskupdatedAt: {
                type: Date,
                default: Date.now

            }
        }]

    },
    {
        // Make Mongoose use Unix time 
        timestamps: true
    }
)

module.exports = mongoose.model("Todo", todoSchema);