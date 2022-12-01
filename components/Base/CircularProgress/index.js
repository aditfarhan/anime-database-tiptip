import { CircularProgress } from '@mui/material';

const CircularProgressComponent = (props) => {
  const { customStyle, children, ...otherProps } = props;

  return (
    <CircularProgress sx={customStyle} {...otherProps}>
      {children}
    </CircularProgress>
  );
};

export default CircularProgressComponent;
