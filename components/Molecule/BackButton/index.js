import { useRouter } from 'next/router';
import Image from 'next/image';

import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';

const BackButton = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <BoxComponent
      customStyle={{
        cursor: 'pointer',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}
      onClick={handleClickBack}
    >
      <Image
        alt="arrow-left"
        src="/icon/arrow-left_white.svg"
        height={16}
        width={16}
      />
      <Text
        customStyle={{
          fontSize: '14px',
          letterSpacing: '2px',
          fontWeight: '600',
          color: 'white'
        }}
      >
        Back
      </Text>
    </BoxComponent>
  );
};

export default BackButton;
