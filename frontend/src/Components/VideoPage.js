import "./VideoPage.css";
import logo from "../Logo.svg";
import { Grid, Box } from "@mui/material";
import Iframe from "./Iframe";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import VideoCard from "./VideoCard";
import Container from "@mui/material/Container";
import { endpoint } from "../App.js";
import axios from "axios";


const VideoPage = () => {
  const [video, setVideo] = useState(null);
  const [currentVideoList, setCurrentVideoList] = useState([]);
  const params = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handelError = (e) => {
    if (e.response && e.response.status === 500) {
      enqueueSnackbar(e.response.data.message, { variant: "error" });
    } else {
      enqueueSnackbar("Result not found. Check that the backend is running", {
        variant: "error",
      });
    }
  };

  const getAllVideos = async () => {
    try {
      let response = await axios.get(endpoint);
      setCurrentVideoList(response.data.videos);
    } catch (e) {
      handelError(e);
    }
  };

  const getVideoData = async (id) => {
    try {
      let response = await axios.get(`${endpoint}/${id}`);
      setVideo(response.data);
    } catch (e) {
      handelError(e);
      history.push("/");
    }
  };
  const handelVoteChange = async (id, vote, change) => {
    let reqObj = {
      vote,
      change,
    };
    try {
      await axios.patch(`${endpoint}/${id}/votes`, reqObj);
      getVideoData(params.id);
    } catch (e) {
      handelError(e);
    }
  };

  useEffect(() => {
    getVideoData(params.id);
    getAllVideos();
  }, [params.id]);

  return (
    <>
      <Box className="header">
        <Box onClick={() => history.push("/")} className="logo">
          <img img src={logo} className="App-logo" alt="Xflix-icon"></img>
        </Box>
      </Box>
      <Container style={{ padding: "16px" }}>
        <Grid container>
          {video ? (
            <Grid item xs={12}>
              <Iframe videourl={video} handelVoteChange={handelVoteChange} />
            </Grid>
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
        <Grid item xs={12}>
          <VideoCard videoList={currentVideoList} />
        </Grid>
      </Container>
    </>
  );
};
export default VideoPage;
