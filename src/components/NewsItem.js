import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgURL, newsUrl, author, date} = this.props;
    
    return (
      <div>
        <div className="card my-3 "  style={{height:"440px", width: "300px"}}>
          <div className="img-part">
            <img src={imgURL} className="card-img-top" alt="..." style={{height:"200px", width: "300px"}}/>
          </div>        
          <div className="card-body">
            <div className="title-part "><h5 className="card-title">{title}...</h5></div>
            <div className="description-part"><p className="card-text">{description}...</p></div>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString().slice(0,16)}</small></p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
// 8edde8a45a3a4a549fc61cf537ca0abd

export default NewsItem
