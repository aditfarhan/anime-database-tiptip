import { Box } from '@mui/material';

const BoxComponent = (props) => {
  const { customStyle, onClick, children, ...otherProps } = props;

  return (
    <Box sx={customStyle} onClick={onClick} {...otherProps}>
      {children}
    </Box>
  );
};

export default BoxComponent;
