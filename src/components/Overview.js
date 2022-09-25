import { Component } from "react";
import { json } from "react-router-dom";

class Overview extends Component {
    constructor() {
        super();
    }
    getcolor = (rating) => {
        if (rating >= 8)
            return "green";
        else if (rating > 5)
            return "orange";
        else
            return "red";
    }

    render() {
        const genreId = { 28: "Action", 12: "Adventure", 16: "Animation", 53: "Thriller", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy" }

        let movieObj = JSON.parse(localStorage.getItem('movie-overview'));
        // console.log(JSON.parse(localStorage.getItem('movie-overview')));
        // console.log(movieObj);
        return (

            <>

                <div className="overview-card">

                    <div className="overview-img">
                        <img src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} className="overview-movie-img" alt="..." />
                    </div>
                    <div className="overview-text">
                        <h1 className="overview-title">{movieObj.original_title}<span className="light">({movieObj.release_date.substring(0, 4)})</span><h5 className="overview-date">Released Date :{movieObj.release_date}</h5></h1>
                
                        <div className="overview">
                               <h3>Overview:</h3>
                               <h5>{movieObj.overview}</h5>
                        </div>
                        <h4>Rating :
                          <span  style={{padding:'0.5rem'}}  className={`card-text ${this.getcolor(movieObj.vote_average)}`}>{movieObj.vote_average}</span>
                        </h4>
                        <h4>Language :
                              <span  style={{padding:'0.5rem'}}>{movieObj.original_language}</span>
                        </h4>
                    </div>
                    
                </div>
            </>
        )
    }
}

export default Overview;