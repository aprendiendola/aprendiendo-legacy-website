import moment from 'moment';

const getLessonTime = subject => {
  const newTimeFormat = subject >= 3600 ? 'HH:mm:ss' : 'mm:ss';
  return moment()
    .startOf('day')
    .seconds(subject)
    .format(newTimeFormat);
};

export {
  getLessonTime
};
