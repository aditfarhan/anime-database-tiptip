import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useStoreState } from 'easy-peasy';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';

import CardList from 'components/Molecule/CardList';
import ErrorMessage from 'components/Molecule/ErrorMessage';
import LoadingSpinner from 'components/Molecule/LoadingSpinner';
import HeadApp from 'components/Molecule/Head';
import BackButton from 'components/Molecule/BackButton';
import Header from 'components/Molecule/Header';

import ApiAnime from 'utils/models/anime';
import useWindowDimensions from 'utils/hooks/useWindowDimension';

const MyFavouritesPage = () => {
  const router = useRouter();
  const windowDimensions = useWindowDimensions();

  const favourite = useStoreState((state) => state?.favouriteAnime);
  const [myFavourites, setMyFavourites] = useState({
    loading: true,
    data: favourite
  });

  const fetchAnimeDetail = async () => {
    const tempData = [];
    for (let i = 0; i < favourite?.length; i++) {
      await ApiAnime.getAnimeDetail(favourite?.[i]).then((res) => {
        if (i !== favourite?.length - 1) {
          tempData.push(res?.data?.data);
        } else {
          setMyFavourites({
            loading: false,
            data: [...tempData, res?.data?.data]
          });
        }
      });
    }
  };

  useEffect(() => {
    if (favourite?.length) {
      fetchAnimeDetail();
    } else {
      setMyFavourites({
        loading: false,
        data: null
      });
    }
  }, [favourite]);

  return (
    <>
      <HeadApp title="My Favourites" />
      <Header />
      <BoxComponent
        customStyle={{
          padding: `24px ${windowDimensions?.isMobileView ? 24 : 48}px`,
          marginTop: '48px'
        }}
      >
        {!windowDimensions?.isMobileView ? <BackButton /> : null}
        <BoxComponent
          customStyle={{
            marginTop: `${windowDimensions?.isMobileView ? 24 : 48}px`
          }}
        >
          <BoxComponent>
            <Text
              customStyle={{
                fontSize: `${windowDimensions?.isMobileView ? 32 : 48}px`,
                fontWeight: 'bold'
              }}
            >
              My Favourites
            </Text>
          </BoxComponent>
          <BoxComponent
            customStyle={{
              height: '12px',
              width: `${windowDimensions?.isMobileView ? 218 : 328}px`,
              background: 'red'
            }}
          />
        </BoxComponent>
        {myFavourites?.loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {myFavourites?.data?.length ? (
              <BoxComponent
                customStyle={{
                  padding: '24px 0'
                }}
              >
                <CardList data={myFavourites?.data} />
              </BoxComponent>
            ) : (
              <ErrorMessage
                text="No favorite anime selected."
                buttonText="Go to homepage"
                onRefreshPage={() => router.push('/')}
              />
            )}
          </>
        )}
      </BoxComponent>
    </>
  );
};

export default MyFavouritesPage;
