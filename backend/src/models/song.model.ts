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
      max: 5 * 1024 * 1024, // 5MB
      required: true,
    },
    audio: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    lyrics: {
      type: String,
      required: true,
    },
    // optional
    coverArtSize: {
      type: Number,
      max: 1024 * 1024, // 1MB
    },
    coverArt: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

songSchema.index({ artist: 1, title: 1 }, { unique: true });
songSchema.index({ genre: 1 });

export const Song = mongoose.model("Song", songSchema);
