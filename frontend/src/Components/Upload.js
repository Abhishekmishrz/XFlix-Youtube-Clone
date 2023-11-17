import React, { useState } from "react";
import "./Upload.css"
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Stack } from "@mui/material";
import { endpoint } from "../App.js";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@material-ui/core";



function Upload(props) {

  const [formData, setFormData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  });

  const [isError,setIsError] = useState(false)
  const [errorMsg, setErrorMsg] =useState("Test Error")
  const { enqueueSnackbar } = useSnackbar();
  

  const handleChange = (event) => {
    
    const newFormData = {
      ...formData,
      [event.target.value]: event.target.value,
    };
    setFormData(newFormData);
  };

 
  const handleSubmit = () => {
    postVideoApi(formData);
    
  };
//  console.log("Checkpoint",props.genres)

  const postVideoApi = async(reqBody)=>{
    
    try{
      let response = await axios.post(endpoint,reqBody)
      console.log("response",response)
      setIsError(false);
      setErrorMsg("")
      props.refresh()
      props.onClose()

    }catch(e){
      if(e.response){
        setIsError(true);
        setErrorMsg(e.response.data.message)
      }else{
        enqueueSnackbar("Result not found. Check that the backend is running", {
          variant: "error",
        });
      }

    }
  } 
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={props.handelUploadButton}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <Dialog open={props.isUploadFormVisible} onClose={props.onClose}>
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="upload-btn-video"
            className="form-element"
            label="Video Link"
            name="videoLink"
            // value={formData.videoLink}
            fullWidth
            placeholder="Video Link"
            variant="outlined"
            helperText="This link will be used to derive the video"
            style={{ marginBottom: "16px" }}
            onChange={handleChange}
          />
          <TextField
            required
            id="upload-btn-image"
            className="form-element"
            label="Preview Image"
            placeholder="Thumbnail Image Link"
            helperText="This link will be used to preview the thumbnail image"
            name="previewImage"
            fullWidth
            // value={formData.previewImage}
            variant="outlined"
            style={{ marginBottom: "16px" }}
            onChange={handleChange}
          />
          <TextField
            required
            id="upload-btn-title"
            className="form-element"
            label="Title"
            placeholder="Title"
            helperText="The title will be the representative text for video"
            fullWidth
            name="title"
            variant="outlined"
            // value={formData.title}
            style={{ marginBottom: "16px" }}
            onChange={handleChange}
          />
          <TextField
            select
            required
            id="upload-btn-genre"
            className="select-input form-element"
            label="Genre"
            helperText="Genre will help in categorizing your videos"
            fullWidth
            name="genre"
            variant="outlined"
            // value={formData.genre}
            style={{ marginBottom: "16px" }}
            onChange={handleChange}
          >
            {props.genres
              .filter((option)=>option.value !== "All")
              .map((option)=>(
                <MenuItem key={option.value} className="genre-option" 
                value={option.value}
                >
                  {option.value}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            select
            required
            id="upload-btn-content-rating"
            className="select-input form-element"
            label="Suitable age group for the clip"
            helperText="This will be used to filter videos on age group suitability"
            fullWidth
            name="contentRating"
            variant="outlined"
            // value={formData.contentRating}
            style={{ marginBottom: "16px" }}
            onChange={handleChange}
          >
            {props.contentRatings
              .map((option)=>(
                <MenuItem key={option.value} className="content-rating-option" value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            type="date"
            id="upload-btn-release-date"
            className="form-element"
            lebel="Release date"
            variant="outlined"
            fullWidth
            name="releaseDate"
            style={{ marginBottom: "16px" }}
            helperText="This will be used to sort videos"
            InputLabelProps={{
              shrink: true,
            }}
            // value={formData.releaseDate}
            onChange={handleChange}
            
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row">
          <Button 
          onClick={handleSubmit}
          id="upload-btn-submit" 
          variant="contained"
          type="submit"
          style={{ marginRight: "10px" }}
          color="primary">
            Upload Video
          </Button>
          <Button 
          id="upload-btn-cancel" 
          variant="contained"
          sx={{color:"white"}}
          type="submit"
          onClick={()=> props.onClose()} 
          >
          Cancel
          </Button>
          </Stack>
          {isError && (
            <div className="error-msg">Someting went Wrong -{errorMsg}</div>
          ) }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Upload;
