import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStoreActions, useStoreState } from 'easy-peasy';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';

import Header from 'components/Molecule/Header';
import HeadApp from 'components/Molecule/Head';
import LoadingSpinner from 'components/Molecule/LoadingSpinner';
import PaginationMovieList from 'components/Molecule/Pagination';
import Banner from 'components/Molecule/Banner';
import ErrorMessage from 'components/Molecule/ErrorMessage';
import CardList from 'components/Molecule/CardList';

import ApiAnime from 'utils/models/anime';
import useWindowDimensions from 'utils/hooks/useWindowDimension';

export default function Home() {
  const router = useRouter();
  const windowDimensions = useWindowDimensions();

  const [animeList, setAnimeList] = useState({
    loading: true,
    data: [],
    pagination: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [highestRatingAnime, setHighestRatingAnime] = useState(null);

  const addToFavourites = useStoreActions(
    (actions) => actions?.addFavouriteAnime
  );
  const removeFromFavourites = useStoreActions(
    (actions) => actions?.removeFavouriteAnime
  );
  const favourite = useStoreState((state) => state?.favouriteAnime);
  const isFavouriteAnime = favourite?.includes(highestRatingAnime?.mal_id);

  const onAddToFavourites = () => {
    addToFavourites(Number(highestRatingAnime?.mal_id));
  };

  const onRemoveFromFavourites = () => {
    removeFromFavourites(Number(highestRatingAnime?.mal_id));
  };

  const fetchAnimeList = async (page) => {
    await ApiAnime?.getAnime(page, 12)
      .then((res) => {
        setAnimeList({
          loading: false,
          data: res?.data?.data,
          pagination: res?.data?.pagination
        });
        const highestRatingAnime = res?.data?.data?.reduce(function (
          prev,
          current
        ) {
          return prev?.score > current?.score ? prev : current;
        });
        setHighestRatingAnime(highestRatingAnime);
      })
      .catch(() => {
        setAnimeList({
          loading: false,
          data: [],
          pagination: null
        });
      })
      .finally(() => {
        if (window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      });
  };

  const handleChangePage = (e, value) => {
    setCurrentPage(value || e?.target?.value);
    if (value) {
      handleFetchNewData(value);
    }
  };

  const handleFetchNewData = (page) => {
    setAnimeList({
      ...animeList,
      loading: true
    });
    fetchAnimeList(page || currentPage);
  };

  const onClickButton = () => {
    router.push(`/anime/${highestRatingAnime?.mal_id}`);
  };

  useEffect(() => {
    fetchAnimeList(currentPage);
  }, []);

  return (
    <div>
      <HeadApp title="Home" />
      <main>
        <Header />
        <BoxComponent
          customStyle={{
            marginTop: '48px'
          }}
        >
          {animeList?.data?.length ? (
            <>
              <BoxComponent>
                <Banner
                  highestRatingAnime={highestRatingAnime}
                  isFavouriteAnime={isFavouriteAnime}
                  handleClickButton={onClickButton}
                  onAddToFavourites={onAddToFavourites}
                  onRemoveFromFavourites={onRemoveFromFavourites}
                />
              </BoxComponent>
              <BoxComponent
                customStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: `40px ${
                    windowDimensions?.isMobileView ? 24 : 48
                  }px 32px ${windowDimensions?.isMobileView ? 24 : 48}px`,
                  alignItems: 'baseline'
                }}
              >
                <Text
                  customStyle={{
                    fontWeight: '800',
                    fontSize: '32px',
                    letterSpacing: '-0.03em',
                    color: 'white'
                  }}
                >
                  Explore
                </Text>
                <Text
                  customStyle={{
                    fontWeight: '400',
                    fontSize: '14px',
                    letterSpacing: '-0.03em',
                    color: 'white'
                  }}
                >
                  Show {(animeList?.pagination?.current_page - 1) * 12 + 1} -{' '}
                  {animeList?.pagination?.current_page * 12} anime
                </Text>
              </BoxComponent>
              <BoxComponent
                customStyle={{
                  padding: `0px ${windowDimensions?.isMobileView ? 24 : 48}px`
                }}
              >
                <CardList data={animeList?.data} />
              </BoxComponent>
              <BoxComponent
                customStyle={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              ></BoxComponent>
            </>
          ) : (
            <ErrorMessage onRefreshPage={() => window.location.reload(false)} />
          )}

          {animeList?.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {animeList?.data?.length ? (
                <PaginationMovieList
                  currentPage={currentPage}
                  handleChangePage={handleChangePage}
                  handleClickButton={() => handleFetchNewData()}
                  count={animeList?.pagination?.last_visible_page}
                  page={animeList?.pagination?.current_page}
                />
              ) : null}
            </>
          )}
        </BoxComponent>
      </main>
    </div>
  );
}
