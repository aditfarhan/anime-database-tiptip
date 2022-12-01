import CircularProgressComponent from 'components/Base/CircularProgress';
import BoxComponent from 'components/Base/Box';

import useScrollPosition from 'utils/hooks/useScrollPosition';

const LoadingSpinner = () => {
  const scrollPosition = useScrollPosition();

  return (
    <BoxComponent
      customStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        background: 'rgba(0,0,0,0.7)',
        top: scrollPosition
      }}
    >
      <CircularProgressComponent />
    </BoxComponent>
  );
};

export default LoadingSpinner;
