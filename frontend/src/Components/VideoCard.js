import Grid from "@mui/material/Grid";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ videoList }) => {
  
  const history = useHistory();

  return (
    <div className="container">
      <Grid container className="Video-grid">
        {videoList.length > 0 ? (
          videoList.map((video) => (
            <Grid
              className="Video-view"
              key={video._id}
              item
              xs={12}
              sm={6}
              md={3}
              style={{ padding: "20px" }}
              onClick={() => history.push(`/video/${video._id}`)}
            >
              <Grid container className="Video-tile">
                <Grid item xs={12}>
                  <img
                    className="preview-image"
                    src={video.previewImage}
                    alt="PREVIEW_IMAGE"
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="video-title">{video.title}</p>
                  <p className="video-sub-title">
                    {moment(video.releaseDate).fromNow()}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p className="video-sub-title">
                    {video.genre}
                    {" | "}
                    {video.contentRating}
                  </p>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <div className="no-videos">
            <p>No Videos Found</p>
          </div>
        )}
      </Grid>
    </div>
  );
};
export default VideoCard;
