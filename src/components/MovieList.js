import { Component } from "react";
// import { movies } from "../movieData";
// import {axios} from 'axios'
import { Link } from 'react-router-dom'


const axios = require('axios')

class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            pArr: [1],
            movie: [],
            currentPage: 1,
            Favourites: [],
            searchMovie:[],
        }
    }
    previousPage = () => {
        if (this.state.currentPage !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            }, this.changeMovies)
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=${this.state.currentPage}`)

        this.setState({
            movie: [...res.data.results]
        })
        // console.log("component did mount")
        let movies = JSON.parse(localStorage.getItem("movie-app") || '[]');
        let temp = movies.map((movie) => {
            return movie.id;
        })
        this.setState({
            Favourites: [...temp]
        })
    }
    async changeMovies() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=${this.state.currentPage}`)

        this.setState({
            movie: [...res.data.results]
        })
    }
    nextPage = () => {
        this.setState({
            pArr: [...this.state.pArr, this.state.pArr.length + 1],
            currentPage: this.state.currentPage + 1
        }, this.changeMovies)

    }
    handlePageClick = (ele) => {
        this.setState({
            currentPage: ele
        }, this.changeMovies)
    }
    
    handleFav = (movieObj) => {
        
        let oldData = JSON.parse(localStorage.getItem('movie-app') || '[]')
        if (this.state.Favourites.includes(movieObj.id)) {
            oldData = oldData.filter((movie) => movie.id != movieObj.id)
        }
        else {
            oldData.push(movieObj)
        }
        localStorage.setItem("movie-app", JSON.stringify(oldData))

        this.handleFavState();
    }
    handleFavState = () => {
        let oldData = JSON.parse(localStorage.getItem('movie-app') || '[]')
        let temp = oldData.map((movieObj) => movieObj.id)

        this.setState({
            Favourites: [...temp]
        })

    }

    async searchMovie(title) {
        let temp = [];
        
        const ModalCont = document.querySelector(".modal");
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=1`);
        
        temp = res.data.results.filter((movieObj) => {
            let title2= movieObj.original_title.toLowerCase();
            return title2.includes(title.toLowerCase())
        })
        this.setState({
            searchMovie:[...temp],
        })
        console.log("temp")
        console.log(this.state.searchMovie)
        if(temp.length>0){
           ModalCont.style.display = "block";
        }
    }


    handleCurrText = (textValue) => {
        const ModalCont = document.querySelector(".modal");
        this.setState({
            currText: textValue
        })
        if (textValue == "") {
            ModalCont.style.display = "none";
        }
    }
    handleSearch = () => {
        // console.log(this.state.currText);
        if (this.state.currText != "")
        this.searchMovie(this.state.currText);
    }
    getcolor = (rating) => {
        if (rating >= 8)
            return "green";
        else if (rating > 5)
            return "orange";
        else
            return "red";
    }

    movieInfo = (movieObj) => {
        // console.log(typeof(movieObj));
        localStorage.removeItem('movie-overview')
        localStorage.setItem('movie-overview',JSON.stringify(movieObj));
    }
    render() {
        return (
            <>
                <div>
                    <h2 className="text-center"><strong>Trending</strong></h2>
                </div>
                <nav className="navbar search-bar navbar-expand bg-light">
                    <input className="form-control me-2" type="search" placeholder="Search" value={this.state.currText} onChange={(e)=>this.handleCurrText(e.target.value)} aria-label="Search" />
                    <a className="btn btn-outline-success" onClick={this.handleSearch} >Search</a>
                </nav>
                <div className="modal">
                    {this.state.searchMovie.map((movieObj)=>(

                <div className="card">
                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{movieObj.original_title}</h5>
                            <p className="card-text">{movieObj.overview}</p>
                            <h5>Rating
                          <p class={`card-text ${this.getcolor(movieObj.vote_average)}`}>{movieObj.vote_average}</p>
                          </h5>
                            <a type="button" className="btn btn-primary" onClick={() => this.handleFav(movieObj)}>
                                        {this.state.Favourites.includes(movieObj.id) ? "Remove Favourite" : "Add Favourite"}</a>
                        </div>
                </div>
                    ))}
                </div>
                <div className="movielist">
                    {this.state.movie.map((MovieEle) => (
                        <div className="card  allmoviecards" onMouseEnter={() => this.setState({ hover: MovieEle.id })} onMouseLeave={() => this.setState({ hover: "" })} >
                            <img src={`https://image.tmdb.org/t/p/original${MovieEle.backdrop_path}`} className="movie-img" alt="..." />

                            <h5 className="card-title movies-title" >{MovieEle.original_title} </h5>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {this.state.hover === MovieEle.id && (
                                    <a href="#i" type="button" className="btn btn-primary movies-button" onClick={() => this.handleFav(MovieEle)}>
                                        {this.state.Favourites.includes(MovieEle.id) ? "Remove Favourite" : "Add Favourite"}</a>)}

                                <h5 className="movie-rating">Rating:<p className={` ${this.getcolor(MovieEle.vote_average)}`}>{MovieEle.vote_average}</p></h5>
                                <Link to="/overview" style={{ textDecoration: "none" }} className="movie-overview"><h5 onClick={()=>this.movieInfo(MovieEle)} className="btn btn-outline-info" >overview</h5></Link>

                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item " ><a className="page-link" style={{ pointerEvents: "auto" }} href="#" onClick={this.previousPage}>Previous</a></li>
                            {this.state.pArr.map((ele) => (
                                <li key={ele} className="page-item"><a className="page-link" style={{ pointerEvents: "auto" }} href="#" onClick={() => this.handlePageClick(ele)} >{ele}</a></li>
                            ))}

                            <li className="page-item"><a className="page-link" style={{ pointerEvents: "auto" }} href="#" onClick={this.nextPage}  >Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
export default MovieList;