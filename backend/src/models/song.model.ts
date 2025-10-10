import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    durationInSec: {
      type: Number,
      required: true,
    },
    audioFormat: {
      type: String,
      default: "mp3",
      required: true,
    },
    audioSize: {
      type: Number,
      max: 5 * 1024 * 1024, // max 5MB
      required: true,
    },
    audio: {
      type: Buffer,
      required: true,
    },
    lyrics: {
      type: String,
      required: true,
    },
    // optional
    coverArt: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

songSchema.index({ title: 1, artist: 1 }, { unique: true });
songSchema.index({ genre: 1 });

export const Song = mongoose.model("Song", songSchema);
