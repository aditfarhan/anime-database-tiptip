import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';
import InputComponent from 'components/Base/Input';
import PaginationComponent from 'components/Base/Pagination';

import useWindowDimensions from 'utils/hooks/useWindowDimension';

const PaginationMovieList = (props) => {
  const windowDimensions = useWindowDimensions();

  const { currentPage, count, page, handleChangePage, handleClickButton } =
    props;

  return (
    <BoxComponent
      customStyle={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: `48px ${windowDimensions?.isMobileView ? '24px' : '48px'}`,
        alignItems: `${windowDimensions?.isMobileView ? 'center' : 'baseline'}`,
        flexDirection: `${windowDimensions?.isMobileView ? 'column' : 'row'}`,
        gap: `${windowDimensions?.isMobileView ? '32px 0' : '0'}`
      }}
    >
      <PaginationComponent
        customStyle={{
          button: {
            color: 'white',
            fontWeight: '400'
          },
          div: {
            color: 'white',
            fontWeight: '400'
          },
          ul: {
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                background: 'white',
                color: 'black',
                fontWeight: '600'
              },
              '&:hover': {
                background: 'grey'
              }
            }
          }
        }}
        count={count}
        page={page}
        onChange={handleChangePage}
        siblingCount={windowDimensions?.isMobileView ? 0 : 2}
      />
      <BoxComponent
        customStyle={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}
      >
        <BoxComponent
          customStyle={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Text
            customStyle={{
              fontSize: '14px',
              letterSpacing: '-0.03em',
              fontWeight: '400'
            }}
          >
            Go to page
          </Text>
          <InputComponent
            customStyle={{
              color: 'white',
              width: '40px',
              height: '32px',
              padding: '4px',
              fontWeight: '600',
              fontSize: '14px',
              letterSpacing: '-0.03em',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '5px'
            }}
            type="number"
            value={currentPage}
            disableUnderline
            onChange={handleChangePage}
          />
          <Text
            customStyle={[{
              fontSize: '14px',
              letterSpacing: '-0.03em',
              fontWeight: '400',
              color: 'white',
              display: `${currentPage ? 'flex' : 'none'}`,
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px'
            },
            {
              '&:hover': {
                background: 'grey'
              }
            }]}
            onClick={handleClickButton}
          >
            Go &gt;
          </Text>
        </BoxComponent>
      </BoxComponent>
    </BoxComponent>
  );
};

export default PaginationMovieList;
