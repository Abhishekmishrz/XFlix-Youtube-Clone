import "./Header.css";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, InputAdornment, TextField, Stack } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import Upload from "./Upload"
import logo from "../Logo.svg";
import Box from "@mui/material/Box";
import React, { useEffect,useState } from "react";
import { useHistory, Link } from "react-router-dom";


const  Header= ({ performSearch, 
                  handelCancel,
                  handelUploadButton,
                  isUploadFormVisible,
                  refresh,
                  genres,
                  contentRatings
                }) => {
  const history = useHistory();
  const [debounceTimeout, setDebounceTimeout] = useState(0)

  
// console.log(" this is genres",genres)
// console.log(" this is contentRatings",contentRatings)
  

  const debounceSearch = (event, debounceTimeout) => {
    const value= event.target.value
    if(debounceTimeout){
      clearTimeout(debounceTimeout)
    }
    const timeout=setTimeout(()=>{
      performSearch(value)
    },500)
    setDebounceTimeout(timeout)
  };
  return (
    <Box className="header">
      <Box onClick={() => history.push("/")} className="logo">
        <img img src={logo} className="App-logo" alt="Xflix-icon"></img>
      </Box>

      <TextField
        className="search-desktop"
        size="small"
        placeholder="Search for video"
        name="search"
        InputProps={{
          className: "search",
          endAdornment: (
            <InputAdornment position="end">
              <Search className="search-icon" color="primary" />
            </InputAdornment>
          ),
        }}

        onChange={(event=>debounceSearch(event, debounceTimeout))}
      />
      <Upload 
      handelUploadButton ={handelUploadButton}
      onClose={handelCancel}
      refresh={refresh}
      contentRatings={contentRatings}
      genres={genres}
      isUploadFormVisible={isUploadFormVisible}
      />

      {/* <Box className="button-container">
        <Button className="button">
          <UploadIcon  />
          UPLOAD
        </Button>
      </Box> */}
    </Box>
  );
};

export default Header;
