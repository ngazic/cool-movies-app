import { connect } from "react-redux";
import { Items, TopMoviesDataResponse } from "../../../store/types";
import React from "react";
import { RootState } from "../../../store";
import "./List.scss";
import { useHistory } from "react-router-dom";
import noImgPlacehoder from '../../../assets/no-image.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch } from "react-redux";
import { getSearchItems } from "../../../store/actions";

interface ListProps {
  show: string;
  items?: Items[];
  category?: string;
  totalResults?: number;
  searchQuery?: string;
}

const List: React.FC<ListProps> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const singleView = (category: string, id: number) => {
    history.push("/single", { category, id });
  };
  const fetchMoreData = async () => {
   const page = (props.items?.length!/10) + 1;
    dispatch(getSearchItems(props.searchQuery!, page))
  }
  return (<div>
    <InfiniteScroll dataLength={props.items?.length||0}  next={fetchMoreData}
     loader= {<h4 style={(props.totalResults || 0) > (props.items?.length || 0)? {} : {display: "none"}}>Loading...</h4>} 
     hasMore={(props.totalResults || 0) > (props.items?.length || 0)} >
    <section className="row list">
    {
      props.items!.map((item: Items, index: number) => {
        return (<article onClick={() => singleView(props.category!, index)} className="col col-6 list__item-container" key={index}>
          <div className="list__item">
            <div className="image-wrapper">
              <figure>
                <img src={(item.Poster !== 'N/A')
                  ? item.Poster
                  : noImgPlacehoder
                } alt="" />
              </figure>
            </div>
            <h1 className="title list__item-title">{
              item.Title
            }</h1>
          </div>
        </article>);
      })
    }
  </section>
    </InfiniteScroll>
  </div>);
};

function mapStateToProps(state: RootState, ownProps: ListProps) {
  if (state.search.Search.length > 0) {
    return { items: state.search.Search, category: 'search', totalResults: state.search.totalResults, searchQuery: state.search.searchQuery };
  } else if (ownProps.show === "movies") {
    return { items: state.movie.Search, category: 'movie', totalResults: state.movie.totalResults, searchQuery: state.movie.searchQuery };
  } 
}

export default connect(mapStateToProps, null)(List);
