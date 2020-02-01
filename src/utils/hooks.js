import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const TITLE_BASE = 'Darragh Mc Kay';

export const useTitle = title => {
  useEffect(() => {
    document.title = `${title} | ${TITLE_BASE}`;
  });

  return () => (document.title = `Portfolio | ${TITLE_BASE}`);
};
