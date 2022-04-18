import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { COMICS_URL, selectComics } from '../store/comicsSlice';
import IComic from '../interfaces/IComic';
import ErrorSection from '../components/ErrorSection';
import Image from '../components/Image';
import axios from 'axios';
import moment from 'moment';

type ComicRouteParams = {
  num?: string
}

/**
 * The Comic page's component
 * @category Page
 * @component
 * @returns {JSX.Element}
 */
const Comic = (): JSX.Element => {

  const { num } = useParams<ComicRouteParams>();
  const numInt = num ? parseInt(num) : 0;

  const comics = useAppSelector(selectComics);

  const [comic, setComic] = useState<IComic | undefined | null>(undefined);

  // Load comic's data from the 9 stored comics or by fetching data using the API
  useEffect(() => {
    let comic = comics.find(comic => comic.num === numInt);

    if (comic) {
      setComic(comic);
    } else {
      const fetchComic = async () => {
        try {
          const res = await axios.get<IComic>(COMICS_URL + '/' + numInt);
  
          if (res.data) {
            setComic(res.data);
          } else {
            throw new Error('missing data');
          }
        } catch (err) {
          // Error will appear
          setComic(null);
        }
      }

      fetchComic();
    }
  }, [comics, numInt]);

  // ---------------------------------------

  return (
    <main>
      {comic === undefined && <div className="loader"></div>}

      {comic === null && 
        <ErrorSection subtitle="Comic is not found" msg="Correct the link of the page if it is misspelled.">
          <Link className="btn-primary" to="/">Back to home</Link>
        </ErrorSection>
      }

      {comic && 
        <section className="container text-center">
          <h1>{comic.title}</h1>

          <Image img={{ src: comic.img, alt: comic.alt, title: comic.title }} inline={true} />

          <p>
            Comic #{comic.num} 

            {comic.date ? ' from ' + moment(comic.date).format('DD.MM.YYYY') : ''}
          </p>

          {comic.transcript && 
            <>
              <p className="title mt-1">Transcript</p>
              <p>{comic.transcript}</p>
            </>
          }

          <div className="text-center mt-1">
            <Link className="btn-primary" to="/">Back to home</Link>
          </div>
        </section>
      }
    </main>
  )
}

export default Comic;