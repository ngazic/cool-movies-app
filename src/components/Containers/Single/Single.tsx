import {Items} from "../../../store/types";
import React, {useEffect, useState} from "react";
import "./Single.scss";
import {useLocation, useHistory} from "react-router-dom";
import {useStore} from "react-redux";
import noImgPlacehoder from "../../../assets/no-image.png";
import API from "../../../API-helper";
import {Card} from "antd";

interface ListProps {
  show?: string;
  items?: Items[];
}

const Single: React.FC<ListProps> = (props) => {
  const [description, setDescription] = useState({
    Country: "",
    Awards: "",
    Plot: "",
    imdbRating: "",
    Language: "",
    Runtime: "",
    Genre: "",
    Actors: ""
  });
  const [tab, setTab] = useState('');
  const tabList = [
    {
      key: "description",
      tab: "description"
    }, {
      key: "additional info",
      tab: "additional info"
    }
  ];
  const showDetails = () => {
    return  (<div><p className="single__tag">
    <strong>Type:</strong>
    {item.Type}
  </p>
  <p className="single__tag">
    <strong>Year:</strong>
    {item.Year}
  </p>
  <p className="single__tag">
    <strong>IMDB ID:</strong>
    {item.imdbID}
  </p>
  <p className="single__tag">
    <strong>Rating:</strong>
    {description.imdbRating}
  </p>
  <p className="single__tag">
    <strong>Awards:</strong>
    {description.Awards}
  </p>
  <p className="single__tag">
    <strong>Country:</strong>
    {description.Country}
  </p>
  <p className="single__tag">
    <strong>Actors:</strong>
    {description.Actors}
  </p>
  <p className="single__tag">
    <strong>Genre:</strong>
    {description.Genre}
  </p>
  <p className="single__tag">
    <strong>Language:</strong>
    ${description.Language}
  </p>
  <p className="single__tag">
    <strong>Runtime:</strong>
    {description.Runtime}
  </p></div>);
  }

  const onTabChange = (key:string, type:string) => {
    console.log(key, type);
    setTab(key);
  };
  const {Meta} = Card;
  const store = useStore();
  const history = useHistory();
  const location = useLocation < {
    category: string;
    id: number;
  } > ();

  const item: Items = location.state
    ? store.getState()[location.state.category]["Search"][location.state.id]
    : undefined;

  useEffect(() => {
    async function getDescription(imdbID : string) {
      const res = await fetch(`${API.apiBasePath}=${API.REACT_APP_API_KEY}&i=${imdbID}&plot=full`);
      const data = await res.json();
      setDescription({
        ...data
      });
    }
    getDescription(item.imdbID);
  }, [item.imdbID]);
  const contentList = {
    "description": <p>{description.Plot}</p>,
    "additional info": <div>{showDetails()}</div>,
  };
  const goBack = () => {
    history.goBack();
  };
 
  if (!item) {
    goBack();
  }

  return (<div className="row single">
    <section className="col">
      <Card
      extra={<div onClick={goBack} aria-label="link" className="single__link">
      Back
    </div>}
      cover={<div className = "image-wrapper" > {
          " "
        }
        <figure>
          <img src={item.Poster !== "N/A"
              ? item.Poster
              : noImgPlacehoder} alt=""/>
        </figure>
      </div>
} >
        <Meta title={item.Title}/>
        <Card bordered={false} tabList={tabList}  onTabChange={key => {
            onTabChange(key, 'key');
          }}>
            {contentList[tab as keyof typeof contentList]}
          </Card>
      </Card>
    </section>
  </div>);
};

export default Single;
