import React, { useEffect, useState } from 'react';
import { mutate } from 'swr';

const millisecondsToHuman = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);
  const humanized = [
    hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
    minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
    seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
  ].join(':');

  return humanized;
};

const useCountDown = (timeItem, url, ref) => {
  const [time, setTime] = useState(timeItem);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (time / 1000 < 1) {
        clearInterval(myInterval);
        mutate(url);
        if (ref) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      const nextGameTime = time / 1000 - 1;
      const millNextGameTime = nextGameTime * 1000;
      setTime(millNextGameTime);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [time]);

  useEffect(() => {
    setTime(timeItem);
  }, [timeItem]);

  return millisecondsToHuman(time);
};

export default useCountDown;
