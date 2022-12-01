import { Button } from '@mui/material';

const ButtonComponent = (props) => {
  const { customStyle, onClick, children } = props;

  return (
    <Button sx={customStyle} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
