// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    youtubePlaylist: { type: String },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    discordServerLink: { type: String },
    rating : {type : Number, default : 0},
    price : {type : Number, default : 0, required : true},
    thumbnail : {type : String},
    instructor : {type : mongoose.Schema.Types.ObjectId, ref : "Admin", required : true},
    boughtBy : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true, min: 1, max: 5 }
      }
    ],
    reviews : [
      {
        user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review : { type : String }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
