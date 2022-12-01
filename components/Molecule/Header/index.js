import { useRouter } from 'next/router';
import Image from 'next/image';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';

import useWindowDimensions from 'utils/hooks/useWindowDimension';

const Header = () => {
  const router = useRouter();
  const windowDimensions = useWindowDimensions();

  const renderDesktopViewHeader = () => (
    <>
      <BoxComponent onClick={() => router.push('/')}>
        <Text
          customStyle={{
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '24px',
            lineHeight: '24px'
          }}
        >
          Home
        </Text>
      </BoxComponent>
      <BoxComponent
        customStyle={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          cursor: 'pointer'
        }}
        onClick={() => router.push('/my-favorites')}
      >
        <Image
          alt="star-icon"
          src="/icon/star_white.svg"
          height={12}
          width={12}
        />
        <Text
          customStyle={{
            fontWeight: 'bold',
            fontSize: '16px',
            lineHeight: '16px'
          }}
        >
          Favourites
        </Text>
      </BoxComponent>
    </>
  );

  const renderMobileViewHeader = () => (
    <>
      <BoxComponent
        onClick={() => router?.back()}
        customStyle={{
          cursor: 'pointer'
        }}
      >
        <Image
          alt="arrow-left"
          src="/icon/arrow-left_white.svg"
          height={16}
          width={16}
        />
      </BoxComponent>
      <BoxComponent
        customStyle={{
          display: 'flex',
          gap: '24px'
        }}
      >
        <BoxComponent
          onClick={() => router.push('/')}
          customStyle={{
            cursor: 'pointer'
          }}
        >
          <Image
            alt="home-icon"
            src="/icon/home_white.svg"
            height={16}
            width={16}
          />
        </BoxComponent>
        <BoxComponent
          onClick={() => router.push('/my-favorites')}
          customStyle={{
            cursor: 'pointer'
          }}
        >
          <Image
            alt="star-icon"
            src="/icon/star_white.svg"
            height={16}
            width={16}
          />
        </BoxComponent>
      </BoxComponent>
    </>
  );

  return (
    <BoxComponent
      customStyle={{
        width: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: `12px ${!windowDimensions?.isMobileView ? 48 : 24}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 999,
        backdropFilter: 'blur(30px)'
      }}
    >
      {windowDimensions?.isMobileView
        ? renderMobileViewHeader()
        : renderDesktopViewHeader()}
    </BoxComponent>
  );
};

export default Header;
