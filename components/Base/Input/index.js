import { Input } from '@mui/material';

const InputComponent = (props) => {
  const { customStyle, children, ...otherProps } = props;

  return (
    <Input sx={customStyle} {...otherProps}>
      {children}
    </Input>
  );
};

export default InputComponent;
