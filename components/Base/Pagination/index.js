import { Pagination } from '@mui/material';

const PaginationComponent = (props) => {
  const { customStyle, children, ...otherProps } = props;

  return (
    <Pagination sx={customStyle} {...otherProps}>
      {children}
    </Pagination>
  );
};

export default PaginationComponent;
