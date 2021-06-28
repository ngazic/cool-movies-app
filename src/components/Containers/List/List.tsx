import { Items } from "../../../store/types";
import React from "react";
import { RootState } from "../../../store";
import "./List.scss";
import { useHistory } from "react-router-dom";
import noImgPlacehoder from '../../../assets/no-image.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from "react-redux";
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
  const data = useSelector((state: RootState) => {
    if (props.show === "search") {
      return { items: state.search.Search, totalResults: state.search.totalResults, searchQuery: state.search.searchQuery };
    } else if (props.show === "favorite") {
      return { items: state.favorite.Search, totalResults: state.favorite.totalResults, searchQuery: state.favorite.searchQuery };
    } 
  })

  const singleView = (category: string, id: number) => {
    history.push("/single", { category, id });
  };

  const ToggleFavorite = (index: number, category: string) => {
    dispatch(setFavoritePicks(index, category));
  }
  const fetchMoreData = async () => {
   const page = (data!.items?.length!/10) + 1;
    dispatch(getSearchItems(data!.searchQuery!, page))
  }
  return (<div>
    <InfiniteScroll dataLength={data!.items?.length||0}  next={fetchMoreData}
     loader= {<h4 style={(data!.totalResults || 0) > (data!.items?.length || 0)? {} : {display: "none"}}>Loading...</h4>} 
     hasMore={(data!.totalResults || 0) > (data!.items?.length || 0)} >
    <BackTop />
    <Row  className="list">
    {
      data!.items!.map((item: Items, index: number) => {
        item.isFavorite = item.isFavorite ? true : false
        return (<Col xs={{ span: 24 }} sm={{ span: 10, offset: 1 }} lg={{ span: 10, offset:1 }} className="list__item-container" key={index}>
          
          <div className="list__item">
            <div className="image-wrapper" onClick={() => singleView(props.show!, index)}>
              <figure>
                <img src={(item.Poster !== 'N/A')
                  ? item.Poster
                  : noImgPlacehoder
                } alt="" />
              </figure>
            </div>
            <h1 className="title list__item-title">
            <StarFilled  style={{color: item.isFavorite ? "yellow" : ""}} className="star" onClick={()=>ToggleFavorite(index, props.show!)}/>
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

export default List;
