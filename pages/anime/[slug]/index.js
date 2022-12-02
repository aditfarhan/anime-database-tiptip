import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useStoreActions, useStoreState } from 'easy-peasy';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';
import ButtonComponent from 'components/Base/Button';

import HeadApp from 'components/Molecule/Head';
import CardList from 'components/Molecule/CardList';
import LoadingSpinner from 'components/Molecule/LoadingSpinner';
import BackButton from 'components/Molecule/BackButton';
import Header from 'components/Molecule/Header';

import ApiAnime from 'utils/models/anime';
import useWindowDimensions from 'utils/hooks/useWindowDimension';
import trimText from 'utils/functions/trimText';

const DetailAnimePage = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const windowDimensions = useWindowDimensions();

  const addToFavourites = useStoreActions(
    (actions) => actions?.addFavouriteAnime
  );
  const removeFromFavourites = useStoreActions(
    (actions) => actions?.removeFavouriteAnime
  );
  const favourite = useStoreState((state) => state?.favouriteAnime);
  const isFavouriteAnime = favourite?.includes(Number(slug));

  const [animeDetail, setAnimeDetail] = useState({
    loading: true,
    data: null
  });

  const [animeRecommendation, setAnimeRecommendation] = useState({
    loading: true,
    data: []
  });
  const [isCollapseSynopsis, setIsCollapseSynopsis] = useState(true);

  const fetchAnimeDetail = async () => {
    await ApiAnime.getAnimeDetail(slug)
      .then((res) => {
        setAnimeDetail({
          loading: false,
          data: res?.data?.data
        });
      })
      .catch(() => {
        setAnimeDetail({
          loading: false,
          data: null
        });
      });
  };

  const fetchAnimeRecommendation = async () => {
    await ApiAnime.getAnimeRecommendation(slug)
      .then((res) => {
        setAnimeRecommendation({
          loading: false,
          data: res?.data?.data
        });
      })
      .catch(() => {
        setAnimeRecommendation({
          loading: false,
          data: []
        });
      });
  };

  const onClickAddAsFavourites = () => {
    if (!isFavouriteAnime) {
      addToFavourites(Number(slug));
    } else {
      removeFromFavourites(Number(slug));
    }
  };

  useEffect(() => {
    if (slug) {
      setIsCollapseSynopsis(true);
      fetchAnimeDetail();
      fetchAnimeRecommendation();
    }
  }, [slug]);

  return (
    <>
      <HeadApp title={animeDetail?.data?.title || 'Anime Detail'} />
      <Header />

      {animeDetail?.loading || animeRecommendation?.loading ? (
        <LoadingSpinner />
      ) : (
        <BoxComponent
          customStyle={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '72px 0 40px 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <BoxComponent
            customStyle={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: `0 ${windowDimensions?.isMobileView ? 24 : 48}px 24px ${
                windowDimensions?.isMobileView ? 24 : 48
              }px`,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              gap: `${windowDimensions?.isMobileView ? '12px' : '120px'}`,
              zIndex: 99,
              flexDirection: windowDimensions?.isMobileView
                ? 'column-reverse'
                : 'row',
              alignItems: 'center'
            }}
          >
            <BoxComponent
              customStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: windowDimensions?.isMobileView ? 'center' : ''
              }}
            >
              {!windowDimensions?.isMobileView ? <BackButton /> : null}
              <BoxComponent
                customStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: windowDimensions?.isMobileView ? 'center' : '',
                  textAlign: windowDimensions?.isMobileView ? 'center' : ''
                }}
              >
                <Text
                  customStyle={{
                    fontWeight: '800',
                    fontSize: `${windowDimensions?.isMobileView ? 24 : 56}px`,
                    letterSpacing: '-0.03em'
                  }}
                >
                  {animeDetail?.data?.title}
                </Text>
                <BoxComponent
                  customStyle={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    alt="star-icon"
                    src="/icon/star_white.svg"
                    height={12}
                    width={12}
                  />
                  <Text
                    customStyle={{
                      fontSize: `${windowDimensions?.isMobileView ? 14 : 16}px`,
                      lineHeight: '110%',
                      fontWeight: '600',
                      color: 'white'
                    }}
                  >{`${animeDetail?.data?.score || '-'} • ${
                    animeDetail?.data?.year || '-'
                  }`}</Text>
                </BoxComponent>
              </BoxComponent>
              <ButtonComponent
                customStyle={[
                  {
                    color: 'white',
                    fontWeight: '600',
                    background: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '4px',
                    letterSpacing: '2px',
                    padding: '12px 24px',
                    width: windowDimensions?.isMobileView
                      ? '100%'
                      : 'fit-content',
                    fontSize: `${windowDimensions?.isMobileView ? 12 : 14}px`
                  },
                  {
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.25)'
                    }
                  }
                ]}
                onClick={onClickAddAsFavourites}
              >
                {isFavouriteAnime
                  ? 'Remove from favourite'
                  : 'Add as Favourites'}
              </ButtonComponent>
              <BoxComponent
                customStyle={{
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <Text
                  customStyle={{
                    fontSize: `${windowDimensions?.isMobileView ? 12 : 14}px`,
                    textAlign: 'justify',
                    lineHeight: '140%',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {isCollapseSynopsis & windowDimensions?.isMobileView
                    ? trimText(animeDetail?.data?.synopsis, 280)
                    : animeDetail?.data?.synopsis}
                </Text>
              </BoxComponent>
              <BoxComponent
                customStyle={[
                  {
                    display: 'flex',
                    alignSelf: 'flex-start'
                  },
                  {
                    '&:hover': {
                      transform: 'scale(1.075)'
                    }
                  }
                ]}
              >
                <Text
                  customStyle={{
                    fontSize: '12px',
                    lineHeight: '140%',
                    fontWeight: '400',
                    display: `${!windowDimensions?.isMobileView ? 'none' : ''}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsCollapseSynopsis(!isCollapseSynopsis)}
                >
                  Show {isCollapseSynopsis ? 'More' : 'Less'}
                </Text>
              </BoxComponent>
            </BoxComponent>
            <BoxComponent>
              <Image
                alt="anime-banner"
                style={{ borderRadius: '12px' }}
                src={animeDetail?.data?.images?.jpg?.large_image_url}
                height={320}
                width={240}
              />
            </BoxComponent>
          </BoxComponent>
          <BoxComponent
            customStyle={{
              display: 'flex',
              gap: `${windowDimensions?.isMobileView ? 16 : 32}px`,
              flexDirection: windowDimensions?.isMobileView ? 'column' : 'row',
              alignItems: windowDimensions?.isMobileView
                ? 'flex-start'
                : 'center',
              padding: `0 ${windowDimensions?.isMobileView ? 24 : 48}px`
            }}
          >
            <Text
              customStyle={{
                fontSize: '24px',
                lineHeight: '110%',
                fontWeight: '600',
                color: 'white'
              }}
            >
              Watch Trailer
            </Text>
            {animeDetail?.data?.trailer?.embed_url ? (
              <iframe
                src={animeDetail?.data?.trailer?.embed_url}
                allowFullScreen
                width={200}
                height={136}
                style={{
                  border: 'none'
                }}
              />
            ) : (
              <BoxComponent>No trailer available.</BoxComponent>
            )}
          </BoxComponent>
          <img
            alt="bg-anime-image"
            src={animeDetail?.data?.images?.jpg?.image_url}
            height={windowDimensions?.isMobileView ? '40%' : '60%'}
            style={{
              position: 'absolute',
              zIndex: 0,
              filter: 'blur(200px)',
              left: '44%'
            }}
          />
          <BoxComponent
            customStyle={{
              marginTop: `${windowDimensions?.isMobileView ? 40 : 80}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: `${windowDimensions?.isMobileView ? 16 : 32}px`,
              zIndex: 99,
              background: 'black',
              padding: `40px ${windowDimensions?.isMobileView ? 24 : 48}px`
            }}
          >
            <Text
              customStyle={{
                fontSize: `${windowDimensions?.isMobileView ? 16 : 32}px`,
                textAlign: 'justify',
                fontWeight: '800',
                letterSpacing: '-0.03em'
              }}
            >
              Another Recommendation
            </Text>
            <CardList data={animeRecommendation?.data} maxDataCount={12} />
          </BoxComponent>
        </BoxComponent>
      )}
    </>
  );
};

export default DetailAnimePage;
