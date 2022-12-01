import { Typography } from '@mui/material';

const Text = (props) => {
  const { customStyle, onClick, children } = props;

  return (
    <Typography sx={customStyle} onClick={onClick}>
      {children}
    </Typography>
  );
};

export default Text;
