import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     id: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     image: String,
//     bio: String,
//     posts:[
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ],
//     onboarded: {
//         type: Boolean,
//         default: false,
//     },
//     communities: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "community"
//         }
//     ]

// });

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "community"
        }
    ],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    favourites: [{ type: String }]

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;