import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: '6',
    category: 'general'

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
 
  constructor(props){
    super(props);
    // console.log("Hello I am a constructor from news component");
    this.state = {
       articles : [],
       loading: false,
       page: 1,
       totalResults: 0
    }
    document.title = `NewsDump - ${this.capitalizeFirstLetter(this.props.category)}`
  }
// 8edde8a45a3a4a549fc61cf537ca0abd
  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(50)
    let parsedData = await data.json()
    // console.log(parsedData);
    this.props.setProgress(100)
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading:false
    })
    
  }

  async componentDidMount(){
    this.updateNews()
  }

  handlePrevClick = async ()=>{
    this.setState({page: this.state.page - 1})
    this.updateNews()
  }
  handleNextClick = async ()=>{
    this.setState({page: this.state.page + 1})
    this.updateNews()
  }

  fetchData = async ()=>{
    this.setState({page:this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    
    let data = await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    
 
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults
    })
    // console.log(this.state.articles.length)
    // console.log(this.state.totalResults)
  }

  render() {
    console.log("Render")
    return (
      <div className='container my-3'>
        <h1 className='my-3 '>NewsDump - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll dataLength={this.state.articles.length}  next={this.fetchData} hasMore={this.state.articles.length <= this.state.totalResults} loader={<Spinner/>}>
          <div className="container">
            <div className="row">
              {this.state.articles.map((element)=>{
                  // console.log(element)
                  return (
                    <div className="col-md-4" key={element.index} >
                      <NewsItem newsUrl={element.url} title={element.title?element.title.slice(0,40):""} description = {element.description?element.description.slice(0,88):""} imgURL= {element.urlToImage?element.urlToImage:"https://i.ibb.co/gtwdP2D/NEWS.png"} author={element.author} date={element.publishedAt} />
                    </div> 
                  )
                
                })}  
            </div>
          </div>
        </InfiniteScroll>
        
        {/* <div className=" d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={(this.state.page + 1) > (Math.ceil(this.state.totalResults/this.props.pageSize))} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
                
      </div>
      
    )
  }
}

export default News
