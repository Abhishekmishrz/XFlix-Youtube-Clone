import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import "./Iframe.css";

const Iframe = ({ videourl, handelVoteChange }) => {
  return (
    <>
      <div className="container">
        <div className="iframe-parent">
          <iframe
            frameBorder="0"
            className="iframe-main"
            title="video"
            allowFullScreen
            allow="autoplay; encrypted-media"
            src={`https://${videourl.videoLink}`}
          ></iframe>
        </div>
      </div>
      <div className="container">
        <div className="video-bar">
          <div>
            <p className="playing-title">{videourl.title}</p>
            <div className="line">
              <span className="tag views-tag">{videourl.viewCount}</span>
              <div className="dot"></div>
              <span className="tag content-rating-tag">
                {videourl.contentRating}
              </span>
              <div className="dot"></div>
              <span className="tag release-date-tag">
                {videourl.releaseDate}
              </span>
            </div>
          </div>
          <div className="vote-container">
            <span
              className="vote-pill upvote-pill"
              onClick={() =>
                handelVoteChange(videourl._id, "upVote", "increase")
              }
            >
              <ThumbUpIcon className="thumb-icon" />
              <span>{videourl.votes.upVotes}</span>
            </span>
            <span
              className="vote-pill downvote-pill"
              onClick={() =>
                handelVoteChange(videourl._id, "downVote", "increase")
              }
            >
              <ThumbDownAltIcon className="thumb-icon" />
              <span>{videourl.votes.downVotes}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Iframe;
