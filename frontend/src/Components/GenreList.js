import "./GenreList.css";
const GenreList = ({ allGenres,onChange,value, selectedGeners, handelGenreChange }) => {
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
        <select name="Sort"
          className="btn active-toolbar-button" 
          id="demo-simple-select"
          label="Sort"
          value={value}
          onChange= {onChange}
        >
          <option value="releaseDate">Release Date</option>
          <option value="viewCount">View Count</option>
        </select>
        </div>
      </div>
    </>
  );
};
export default GenreList;
