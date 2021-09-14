import React, { Component } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitaliseFirst = (word)=> {
    let lcWord = word.toLowerCase();
    return lcWord.charAt(0).toUpperCase() + lcWord.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsBird - ${this.capitaliseFirst(this.props.category)}`;
  }

  async updateNews(page){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreNews = async ()=>{
    this.setState({
      page: this.state.page + 1,
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }


  render() {
    return (
      <div className="container my-5 justify-content-evenly">
        <div className="container" style={{paddingTop: "20px"}}>
            <h1 className="my-5 text-center">NewsBird - Top {this.capitaliseFirst(this.props.category)} Headlines</h1>
        </div>
        {this.state.loading && <Loading />}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreNews}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading/>}
          >
        <div className="container">
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col col-lg-4 col-md-6 col-sm-12 col-12 my-3" key={element.url}>
                    <div>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageUrl={
                          !element.urlToImage
                            ? "https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_960_720.png"
                            : element.urlToImage
                        }
                        newsUrl={element.url}
                        date={element.publishedAt}
                        author={element.author} source={element.source.name}
                      />
                    </div>
                  </div>
                );
              })}            
          </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
