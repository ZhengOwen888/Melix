import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      min: 0,
      max: 1000000,
      required: true,
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song", // refer to Song database
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // refer to User database
      required: true,
    },
  },
  { timestamps: true }
);

scoreSchema.index({ user: 1, score: -1 }); // useful to get user high score
scoreSchema.index({ song: 1, score: -1 }); // useful for leaderboards (maybe)

export const Score = mongoose.model("Score", scoreSchema);
