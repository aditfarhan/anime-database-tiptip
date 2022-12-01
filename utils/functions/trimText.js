const trimText = (value, maxLength = 400) => {
  if (value?.length > maxLength) {
    return value?.slice(0, maxLength) + '...';
  }
  return value;
};

export default trimText;
