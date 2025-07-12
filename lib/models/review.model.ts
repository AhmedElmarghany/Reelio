import mongoose from "mongoose";
const movieInfo = new mongoose.Schema({
  title: { type: String },
  posterLink: { type: String },
  year: { type: String },
});
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  rate: { type: Number, required: true },
  movieId: { type: String, required: true },
  movieInfo: { type: movieInfo, required: true },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;




// ===============================================
// الكود لحد هنا شغال
// ===============================================
// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//     text: { type: String, required: true },
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     Community: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Community',
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     likes: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     comments: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Comment'
//     }],
//     rate: { type: Number, required: true },
//     movieId: { type: String, required: true }
// });

// const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

// export default Review;