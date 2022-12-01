import BoxComponent from 'components/Base/Box';
import Text from 'components/Base/Text';
import ButtonComponent from 'components/Base/Button';

const ErrorMessage = (props) => {
  const {
    text = 'Failed to fetch data, please try again.',
    buttonText = 'Refresh Page',
    onRefreshPage
  } = props;

  return (
    <BoxComponent
      customStyle={{
        width: '100%',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px 0'
      }}
    >
      <Text>{text}</Text>
      <ButtonComponent
        customStyle={[
          {
            background: 'white',
            fontWeight: 'bold',
            color: 'black'
          },
          {
            '&:hover': {
              background: 'white'
            }
          }
        ]}
        onClick={onRefreshPage}
      >
        {buttonText}
      </ButtonComponent>
    </BoxComponent>
  );
};

export default ErrorMessage;
