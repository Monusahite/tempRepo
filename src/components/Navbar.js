import { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Navbar extends Component {
    constructor(){
        super();
        this.state={
            currText:"",
            Favourites:[],
        }
    }
    async componentDidMount(){ 
        const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=${this.state.currentPage}`)

           
            // console.log("component did mount")
            let movies = JSON.parse(localStorage.getItem("movie-app") || '[]');
            let temp = movies.map((movie)=>{
                return movie.id;
            })
            this.setState({
                Favourites:[...temp]
            })
        }
    handleFav=(movieObj)=>{
        let oldData=JSON.parse(localStorage.getItem('movie-app')||'[]')
        if(this.state.Favourites.includes(movieObj.id)){
            oldData=oldData.filter((movie)=>movie.id!=movieObj.id)
        }
        else{
            oldData.push(movieObj)
        }
        localStorage.setItem("movie-app",JSON.stringify(oldData))

        this.handleFavState();
    }
    handleFavState=()=>{
        let oldData=JSON.parse(localStorage.getItem('movie-app')||'[]')
        let temp=oldData.map((movieObj)=>movieObj.id)

        this.setState({
            Favourites:[...temp]
        })

    }
    async searchMovie(title){
        let temp =[];
        
        const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=84d9ea6d99b38863f7d41e7d9074ad62&language=en-US&page=1`);
        
        temp = res.data.results.filter((movieObj)=>{
            let title2 = movieObj.original_title.toLowerCase();
            return title2.includes(title.toLowerCase())
        })
        this.showModal(temp)
    }
    showModal =(temp)=>{
        const ModalCont = document.querySelector(".modal");

            if(temp.length!=0){
                    console.log(temp);
                    let str ="";
                    temp.map((movieObj)=>{
                        str +=`<div class="card search-card">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/original${movieObj.backdrop_path}" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">${movieObj.title}</h5>
                          <p class="card-text">${movieObj.overview}</p>
                          <h5>Rating
                          <p class="card-text ${this.getcolor(movieObj.vote_average)}">${movieObj.vote_average}</p>
                          </h5>
                          <a href="#" class="btn btn-primary" ${onclick = ()=>this.handleFav(movieObj)}>${this.state.Favourites.includes(movieObj.id)? "Remove Fav":"add To fav"}</a>
                        </div>
                      </div><hr>`;

                    })
                    ModalCont.innerHTML=str;
                  
                  ModalCont.style.display="block";
                }
                else{
                    ModalCont.innerHTML=`<h1>Not Found</h1>`;
                        ModalCont.style.display="block";
                    }
                }
                handleCurrText=(textValue)=>{
                    const ModalCont = document.querySelector(".modal");
                    this.setState({
                        currText:textValue        
                    })
                    if(textValue == ""){
                        ModalCont.style.display="none";
                    }
                }  
                handleSearch =()=>{ 

                    if(this.state.currText != "")
                    this.searchMovie(this.state.currText);
                }
                getcolor = (rating)=>{
                    if(rating>=8)
                    return "green";
                    else if(rating>5)
                    return "orange";
                    else
                    return "red";
                }
                render() {
                    return (
            <nav className="navbar navbar-expand-lg nav-color">
                    <div className='nav-link'>
                    <Link to="/" style={{ textDecoration: "none" }}> <h1 className='btn btn-outline-primary homebtn'>Home</h1></Link>
                    <Link to="/favourites" style={{ textDecoration: "none" }}> <h2 style={{ marginLeft: "3rem"}} className='btn btn-outline-info homebtn' >Favourites</h2></Link>
                    </div>
                {/* <div style={{display:"flex",color:"blue" ,padding:"0.5rem"}}>
               
               
            </div>  */}
            </nav>
        )
    }
}

export default Navbar;
