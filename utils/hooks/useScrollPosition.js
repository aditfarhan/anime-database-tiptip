import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    function onScroll() {
      setPosition(window.scrollY);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return position;
};

export default useScrollPosition;
