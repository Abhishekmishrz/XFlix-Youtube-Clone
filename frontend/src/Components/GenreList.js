import "./GenreList.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
const GenreList = ({ allGenres,onChange,value, selectedGeners, handelGenreChange }) => {
  console.log(" this is genres from grnrelist",allGenres)
  return (
    <>
      <div className="tool-bar">
        {allGenres.map((genre) => (
          <div
            onClick={() => handelGenreChange(genre)}
            className={
              selectedGeners.includes(genre.value)
                ? "genre-btn active-toolbar-button "
                : " genre-btn"
            }
            key={genre.value}
          >
            {genre.label}
          </div>
        ))}
        <div className="release-btn">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            className="btn active-toolbar-button"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Sort"
            onChange= {onChange}
          >
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="viewCount">View Count</MenuItem>
          </Select>
        </FormControl>
        </div>
      </div>
    </>
  );
};
export default GenreList;
