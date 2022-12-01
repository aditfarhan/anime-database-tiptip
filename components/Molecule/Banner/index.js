import useWindowDimensions from 'utils/hooks/useWindowDimension';
import trimText from 'utils/functions/trimText';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';
import ButtonComponent from 'components/Base/Button';

const Banner = (props) => {
  const windowDimensions = useWindowDimensions();

  const {
    highestRatingAnime,
    handleClickButton,
    isFavouriteAnime,
    onAddToFavourites,
    onRemoveFromFavourites
  } = props;

  const renderBannerMobileView = () => (
    <BoxComponent>
      <BoxComponent
        customStyle={{
          width: '100%',
          position: 'relative'
        }}
      >
        <img
          alt="selected-anime-image"
          src={highestRatingAnime?.images?.jpg?.image_url}
          height="100%"
          width="100%"
          style={{
            objectFit: 'fill',
            filter: 'brightness(0.4)',
            maxHeight: '550px'
          }}
        />
        <BoxComponent
          customStyle={{
            width: '100%',
            position: 'absolute',
            bottom: 24,
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <Text
            customStyle={{
              fontSize: '12px',
              fontWeight: '400',
              letterSpacing: '3px',
              lineHeight: '110%'
            }}
          >
            TOP RATED
          </Text>
          <Text
            customStyle={{
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: '110%',
              letterSpacing: '-0.03em'
            }}
          >
            {highestRatingAnime?.title}
          </Text>
          <Text
            customStyle={{
              fontSize: '12px',
              textAlign: 'justify',
              lineHeight: '140%',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {trimText(highestRatingAnime?.synopsis)}
          </Text>
          <BoxComponent
            customStyle={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px'
            }}
          >
            <ButtonComponent
              customStyle={[
                {
                  background: 'white',
                  color: 'black',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  padding: '12px 24px',
                  fontSize: '12px'
                },
                {
                  '&:hover': {
                    background: 'white'
                  }
                }
              ]}
              onClick={handleClickButton}
            >
              INFO
            </ButtonComponent>
            <ButtonComponent
              customStyle={[
                {
                  color: 'white',
                  fontWeight: '600',
                  background: 'rgba(255, 255, 255, 0.25)',
                  borderRadius: '4px',
                  letterSpacing: '2px',
                  padding: '12px 24px',
                  fontSize: '12px'
                },
                {
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.25)'
                  }
                }
              ]}
              onClick={() =>
                !isFavouriteAnime
                  ? onAddToFavourites()
                  : onRemoveFromFavourites()
              }
            >
              {`${!isFavouriteAnime ? 'Add to' : 'Remove from'} Favourites`}
            </ButtonComponent>
          </BoxComponent>
        </BoxComponent>
      </BoxComponent>
    </BoxComponent>
  );

  const renderBannerDesktopView = () => (
    <BoxComponent
      customStyle={{
        display: 'flex',
        padding: '100px 48px 52px 48px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <BoxComponent
        customStyle={{
          display: 'flex',
          zIndex: '99',
          gap: '0 20px'
        }}
      >
        <BoxComponent
          customStyle={{
            width: '100%',
            gap: '24px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Text
            customStyle={{
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '3px',
              lineHeight: '110%'
            }}
          >
            TOP RATED
          </Text>
          <Text
            customStyle={{
              fontSize: '56px',
              fontWeight: '800',
              lineHeight: '110%',
              letterSpacing: '-0.03em'
            }}
          >
            {highestRatingAnime?.title}
          </Text>
          <Text
            customStyle={{
              fontSize: '16px',
              textAlign: 'justify',
              lineHeight: '140%',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {trimText(highestRatingAnime?.synopsis)}
          </Text>
          <BoxComponent
            customStyle={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px'
            }}
          >
            <ButtonComponent
              customStyle={[
                {
                  background: 'white',
                  color: 'black',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  padding: '12px 24px',
                  fontSize: '14px'
                },
                {
                  '&:hover': {
                    background: 'white'
                  }
                }
              ]}
              onClick={handleClickButton}
            >
              INFO
            </ButtonComponent>
            <ButtonComponent
              customStyle={[
                {
                  color: 'white',
                  fontWeight: '600',
                  background: 'rgba(255, 255, 255, 0.25)',
                  borderRadius: '4px',
                  letterSpacing: '2px',
                  padding: '12px 24px',
                  fontSize: '14px'
                },
                {
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.25)'
                  }
                }
              ]}
              onClick={() =>
                !isFavouriteAnime
                  ? onAddToFavourites()
                  : onRemoveFromFavourites()
              }
            >
              {`${!isFavouriteAnime ? 'Add to' : 'Remove from'} Favourites`}
            </ButtonComponent>
          </BoxComponent>
        </BoxComponent>
        <BoxComponent
          customStyle={{
            width: '80%',
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <img
            alt="selected-anime-image"
            src={highestRatingAnime?.images?.jpg?.image_url}
            height="100%"
            style={{
              BoxComponentShadow: '0px 0px 30px rgba(0, 0, 0, 0.15)',
              borderRadius: '12px'
            }}
          />
        </BoxComponent>
      </BoxComponent>
      <img
        alt="bg-anime-image"
        src={highestRatingAnime?.images?.jpg?.image_url}
        height="300%"
        style={{
          position: 'absolute',
          zIndex: 0,
          filter: 'blur(200px)',
          left: '44%'
        }}
      />
    </BoxComponent>
  );

  return (
    <>
      {!windowDimensions?.isMobileView
        ? renderBannerDesktopView()
        : renderBannerMobileView()}
    </>
  );
};

export default Banner;
