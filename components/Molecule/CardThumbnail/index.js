import { useRouter } from 'next/router';
import Image from 'next/image';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';

import trimText from 'utils/functions/trimText';
import useWindowDimensions from 'utils/hooks/useWindowDimension';

const CardThumbnail = (props) => {
  const { data } = props;
  const router = useRouter();

  const windowDimensions = useWindowDimensions();

  const handleOnClickAnime = (id) => {
    router.push(`/anime/${id}`);
  };

  return (
    <BoxComponent
      customStyle={{
        height: '200px',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '4px'
      }}
      onClick={() => handleOnClickAnime(data?.mal_id || data?.entry?.mal_id)}
    >
      <img
        alt="anime-image"
        src={
          data?.images?.jpg?.large_image_url ||
          data?.entry?.images?.jpg?.large_image_url
        }
        height="160px"
        width="100%"
        style={{ objectFit: 'cover', borderRadius: '8px' }}
      />
      <BoxComponent customStyle={{ height: '36px', marginTop: '12px' }}>
        <Text
          customStyle={{
            fontSize: `${windowDimensions?.isMobileView ? 12 : 16}px`,
            lineHeight: '17.6px',
            fontWeight: 'bold'
          }}
        >
          {trimText(data?.title || data?.entry?.title, 26)}
        </Text>
      </BoxComponent>
      {data?.score || data?.entry?.score ? (
        <BoxComponent
          customStyle={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '4px 6px',
            borderTopRightRadius: '8px',
            borderBottomLeftRadius: '8px',
            color: 'white',
            fontWeight: '600',
            fontSize: `${windowDimensions?.isMobileView ? 10 : 14}px`,
            display: 'flex',
            gap: '8px',
            alignItems: 'baseline'
          }}
        >
          <Image
            alt="star-icon"
            src="/icon/star_white.svg"
            height={windowDimensions?.isMobileView ? 8 : 10}
            width={windowDimensions?.isMobileView ? 8 : 10}
          />
          {data?.score || data?.entry?.score}
        </BoxComponent>
      ) : null}
    </BoxComponent>
  );
};

export default CardThumbnail;
