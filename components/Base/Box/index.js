import { Box } from '@mui/material';

const BoxComponent = (props) => {
  const { customStyle, onClick, children } = props;

  return (
    <Box sx={customStyle} onClick={onClick}>
      {children}
    </Box>
  );
};

export default BoxComponent;
