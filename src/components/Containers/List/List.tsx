import { connect } from "react-redux";
import { Items } from "../../../store/types";
import React, { useRef } from "react";
import { RootState } from "../../../store";
import "./List.scss";
import { useHistory } from "react-router-dom";
import noImgPlacehoder from '../../../assets/no-image.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch } from "react-redux";
import { setFavoritePicks, getSearchItems } from "../../../store/actions";
import { StarFilled} from '@ant-design/icons'
import { BackTop, Row, Col } from 'antd';

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
  const starRefs = useRef([]);

  const singleView = (category: string, id: number) => {
    history.push("/single", { category, id });
  };

  const ToggleFavorite = (index: number, category: string) => {
    dispatch(setFavoritePicks(index, category));
    const el =(starRefs.current[index] as HTMLElement).querySelector('svg')!;
    if(el.style['fill'] !== ''){
      el.style['fill'] = '';
    }else {
      el.style['fill'] = 'yellow';
    }
  }
  const fetchMoreData = async () => {
   const page = (props.items?.length!/10) + 1;
    dispatch(getSearchItems(props.searchQuery!, page))
  }
  return (<div>
    <InfiniteScroll dataLength={props.items?.length||0}  next={fetchMoreData}
     loader= {<h4 style={(props.totalResults || 0) > (props.items?.length || 0)? {} : {display: "none"}}>Loading...</h4>} 
     hasMore={(props.totalResults || 0) > (props.items?.length || 0)} >
    <BackTop />
    <Row  className="list">
    {
      props.items!.map((item: Items, index: number) => {
        item.isFavorite = item.isFavorite ? true : false
        console.log(item.isFavorite)
        return (<Col xs={{ span: 24 }} sm={{ span: 10, offset: 1 }} lg={{ span: 10, offset:1 }} className="list__item-container" key={index}>
          
          <div className="list__item">
            <div className="image-wrapper" onClick={() => singleView(props.category!, index)}>
              <figure>
                <img src={(item.Poster !== 'N/A')
                  ? item.Poster
                  : noImgPlacehoder
                } alt="" />
              </figure>
            </div>
            <h1 className="title list__item-title">
            <StarFilled  style={{color: item.isFavorite ? "yellow" : ""}} ref={el => (starRefs.current[index]as any) = el} className="star" onClick={()=>ToggleFavorite(index, props.category!)}/>
              {
              item.Title
            }</h1>
          </div>
        </Col>);
      })
    }
    </Row>
    </InfiniteScroll>
  </div>);
};

function mapStateToProps(state: RootState, ownProps: ListProps) {
  console.log('state from list.tsx')
  console.log(state)
  if (ownProps.show === "search") {
    return { items: state.search.Search, category: 'search', totalResults: state.search.totalResults, searchQuery: state.search.searchQuery };
  } else if (ownProps.show === "favorite") {
    return { items: state.favorite.Search, category: 'favorite', totalResults: state.favorite.totalResults, searchQuery: state.favorite.searchQuery };
  } 
}

export default connect(mapStateToProps, null)(List);
