import { Items } from "../../../store/types";
import React, {useEffect, useState} from "react";
import "./Single.scss";
import { useLocation, useHistory } from "react-router-dom";
import { useStore } from "react-redux";
import noImgPlacehoder from '../../../assets/no-image.png'
import API from '../../../API-helper'

interface ListProps {
  show?: string;
  items?: Items[];
}

const Single: React.FC<ListProps> = (props) => {
  const [description, setDescription] = useState({Country: '', Awards: '', Plot: '',imdbRating: '', Language: '', Runtime: '', Genre: '', Actors: ''});
  const store = useStore();
  const history = useHistory();
  const location = useLocation<{
    category: string;
    id: number;
  }>();
  const item: Items = location.state ? store.getState()[location.state.category]['Search'][location.state.id] : undefined;

  useEffect(() => {
    async function getDescription(imdbID:string) {
      const res = await fetch(`${API.apiBasePath}=${API.REACT_APP_API_KEY}&i=${imdbID}&plot=full`);
      const data = await res.json();
      setDescription({...data})
    }
    getDescription(item.imdbID)
 }, [item.imdbID])
 
  const goBack = () => {
    history.goBack()
  }
  if (!item) {
    goBack()
  }



  return (<div className="row single">
    <section className="col">
      <div onClick={goBack} aria-label="link" className="single__link">Back</div>
      <div className="image-wrapper">
        <figure>
          <img src={(item.Poster !== 'N/A')
            ? item.Poster
            : noImgPlacehoder
          } alt="" />
        </figure>
      </div>
      <h1 className="title single__title">{
        item.Title
      }</h1>
      <p className="single__tag"><strong>Type: </strong>{item.Type}</p>
      <p className="single__tag"><strong>Year: </strong>{item.Year}</p>
      <p className="single__tag"><strong>IMDB ID: </strong>{item.imdbID}</p>
      <p className="single__tag"><strong>Rating: </strong>{description.imdbRating}</p>
      <p className="single__tag"><strong>Awards: </strong>{description.Awards}</p>
      <p className="single__tag"><strong>Country: </strong>{description.Country}</p>
      <p className="single__tag"><strong>Actors: </strong>{description.Actors}</p>
      <p className="single__tag"><strong>Genre: </strong>{description.Genre}</p>
      <p className="single__tag"><strong>Language: </strong>{description.Language}</p>
      <p className="single__tag"><strong>Runtime: </strong>{description.Runtime}</p>
      <div className="single__description">Description:</div>
      <p className="single__plot">{description.Plot}</p>
    </section>
  </div >);
};

export default Single;
