import Grid from "@mui/material/Grid";
import GenreList from "./GenreList";
import VideoCard from "./VideoCard";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import ContentRating from "./ContentRating";
const Dashboard = ({ 
    videoList,
    value,
    onChange,
    allGenres,
    allContentRatingList,
    selectedGeners,
    selectedContentRating,
    handelGenreChange,
    handelContentRatingChange,
    fetchVideos,
    fetchbycontentrating
})=>{
    useEffect(() => {
      fetchVideos()
    
      
    }, [selectedGeners,selectedContentRating])


    
    return (
        <>
            <Grid container >
                <GenreList
                value={value}
                onChange={onChange}
                handelGenreChange={handelGenreChange}
                selectedGeners={selectedGeners}
                allGenres={allGenres}
                />
            </Grid>
            <Grid container >
                <ContentRating
                handelContentRatingChange={handelContentRatingChange}
                selectedContentRating={selectedContentRating}
                allContentRatingList={allContentRatingList}
                />
            </Grid>
            <Grid className="Video-container">
                {/* <Container fixed> */}
                    <VideoCard videoList={videoList} parent="Dashboard" />
                {/* </Container > */}
            </Grid>
        </>
    )

}
export default Dashboard;