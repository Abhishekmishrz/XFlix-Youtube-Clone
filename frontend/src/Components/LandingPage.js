import { useState,useEffect } from "react";
import { useSnackbar } from "notistack";
import { endpoint } from "../App.js";
import axios from "axios";
import Dashboard from "./Dashboard";
import Header from "./Header";
import "./LandingPage.css";
const LandingPage = () => {
  const allGenres = [
    { label: "All", value: "All" },
    { label: "Education", value: "Education" },
    { label: "Sports", value: "Sports" },
    { label: "Comedy", value: "Comedy" },
    { label: "Lifestyle", value: "Lifestyle" },
  ];

  const allContentRatingList = [
    { label: "Anyone", value: "Anyone" },
    { label: "7+", value: "7+" },
    { label: "12+", value: "12+" },
    { label: "16+", value: "16" },
    { label: "18+", value: "18+" },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [videoList, setvideoList] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [Sort,setSort]=useState("releaseDate")
  const [isUploadFormVisible,setIsUploadFormVisible]= useState(false)
  const [contentRating, setContentRating] = useState("Anyone");

  const handelContentRatingChange = (rating) => {
    
    const newContentRatingValue = rating.value;
    if (newContentRatingValue === contentRating) {
      setContentRating("Anyone");
    } else {
      setContentRating(newContentRatingValue)
    }
  };

  const handelGenreChange = (genre) => {
    const all = "All";
    const newGenreValue = genre.value;
    if (newGenreValue === all) {
      setGenres([all]);
    } else {
      const genreWithoutAll = genres.filter((ele) => ele !== all);
      let nextGenres;
      if (genreWithoutAll.includes(newGenreValue)) {
        nextGenres = genreWithoutAll.filter((ele) => ele !== newGenreValue);
      } else {
        nextGenres = [...genreWithoutAll, newGenreValue];
      }

      if (nextGenres.length === 0) {
        setGenres([all]);
      } else {
        setGenres(nextGenres);
      }
    }
  };

  const performSearch = async (text) => {
    const URL = endpoint + `?title=${text}`;

    try {
      const response = await axios.get(URL);
      const videos = response.data.videos;
      setvideoList(videos);
      return videos;
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        setvideoList([]);
        return null;
      }else {
        enqueueSnackbar("Result not found. Check that the backend is running", {
          variant: "error",
        });
      }
    }
  };
  const PerformSort = async() => {
    try {
       const res = await axios.get(endpoint ,{params:{sortBy:Sort}})
       setvideoList(res.data.videos)
       
   } catch(err) {
       console.log(err)
   } 
}

  
  const performAPICall = async () => {
    const URL = endpoint + `?genres=${genres.join(",")}&contentRating=${contentRating}`;

    try {
      const response = await axios.get(URL);
      const videos = response.data.videos;
      setvideoList(videos);
      return videos;
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
      return [];
    }
  };
  useEffect(() => {
    PerformSort() 
 },[Sort])
  
  const handelUploadButton= ()=>{
    setIsUploadFormVisible(true)

  }
  const handelCancel= ()=>{
    setIsUploadFormVisible(false)

  }
  const onChange= (e) => {setSort(e.target.value)}
  
  return (
    <div>
      <Header 
      performSearch={performSearch} 
      handelCancel={handelCancel}
      handelUploadButton={handelUploadButton}
      isUploadFormVisible={isUploadFormVisible}
      refresh={performAPICall}
      genres={allGenres}
      contentRatings ={allContentRatingList}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      />
      <Dashboard
        value={Sort}
        onChange={onChange}
        videoList={videoList}
        allGenres={allGenres}
        allContentRatingList={allContentRatingList}
        selectedGeners={genres}
        selectedContentRating={contentRating}
        handelGenreChange={handelGenreChange}
        handelContentRatingChange={handelContentRatingChange}
        fetchVideos={performAPICall}
        
      />
    </div>
  );
};
export default LandingPage;
