import BoxComponent from 'components/Base/Box';
import CardThumbnail from 'components/Molecule/CardThumbnail';

import useWindowDimensions from 'utils/hooks/useWindowDimension';

const CardList = (props) => {
  const { data } = props;
  const windowDimensions = useWindowDimensions();

  return (
    <BoxComponent
      customStyle={{
        display: 'grid',
        gridTemplateColumns: `repeat(${
          windowDimensions?.isMobileView ? 3 : 6
        }, minmax(0,1fr))`,
        gap: '48px 18px'
        // padding: `0px 48px`,
      }}
    >
      {data?.map((data, index) => (
        <div key={`anime-${index}`}>
          <CardThumbnail data={data} />
        </div>
      ))}
    </BoxComponent>
  );
};

export default CardList;
