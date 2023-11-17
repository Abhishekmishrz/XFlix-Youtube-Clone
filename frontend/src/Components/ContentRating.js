const ContentRating = ({allContentRatingList, selectedContentRating, handelContentRatingChange}) => {
   return  (
        <>
          <div className="tool-bar">
            {allContentRatingList.map((rate)=> (
                <div 
                onClick={()=> handelContentRatingChange(rate)}
                className={
                  selectedContentRating===rate.value
                    ? "genre-btn active-toolbar-button " : " genre-btn"
                }
                key={rate.value}
                >
                    {rate.label}
                </div>
            ))}
          </div>
        </>
        )
}

export default ContentRating;