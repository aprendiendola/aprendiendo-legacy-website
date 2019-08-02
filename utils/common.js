import { objToArr } from "./formatData";
import queryString from "query-string";

export const strToSlug = str => {
  let st;
  st = str.toLowerCase();
  st = st.replace(/[\u00C0-\u00C5]/gi, "a");
  st = st.replace(/[\u00C8-\u00CB]/gi, "e");
  st = st.replace(/[\u00CC-\u00CF]/gi, "i");
  st = st.replace(/[\u00D2-\u00D6]/gi, "o");
  st = st.replace(/[\u00D9-\u00DC]/gi, "u");
  st = st.replace(/[\u00D1]/gi, "n");
  st = st.replace(/[^a-z0-9 ]+/gi, "");
  st = st.trim().replace(/ /g, "-");
  st = st.replace(/[-]{2}/g, "");
  return st.replace(/[^a-z\- ]*/gi, "");
};

export const isObject = value =>
  value && typeof value === "object" && value.constructor === Object;

export const areArraysEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  let equal;
  arr1.map(value => {
    if (equal === false) return;
    equal = Boolean(arr2.find(value2 => value2 === value));
    return equal;
  });
  return equal;
};

export const normalizeString = str =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const objectCopy = o => {
  let v;
  let key;

  const output = Array.isArray(o) ? [] : {}; // eslint-disable-next-line
  for (key in o) {
    v = o[key];
    output[key] = typeof v === "object" ? objectCopy(v) : v;
  }
  return output;
};

export const getCurrentEnrollment = (userEnrollments, courseId) => {
  return userEnrollments.find(
    enrollment => enrollment.course_id === Number(courseId)
  );
};

export const getAcquiredLesson = (userEnrollments, lesson, courseId) => {
  if (!userEnrollments) return null;

  const userEnrollmentFound = getCurrentEnrollment(userEnrollments, courseId);
  let acquiredLessons = [];

  if (userEnrollmentFound) {
    acquiredLessons = userEnrollmentFound.acquired_lessons.data;
  }

  return acquiredLessons.find(acquiredLesson => acquiredLesson.id == lesson.id);
};

export const lessonsAndSubjectsAvailable = (
  userEnrollments,
  markers,
  courseId
) => {
  let allLessons = [];
  const allSubjects = [];

  if (!markers) return [];

  markers.map(marker =>
    marker.lessons.filter(lesson => {
      if (lesson.is_free) {
        return allLessons.push(lesson);
      }

      const userAcquiredLesson = getAcquiredLesson(
        userEnrollments,
        lesson,
        courseId
      );

      if (userAcquiredLesson) {
        return allLessons.push(userAcquiredLesson);
      }

      return false;
    })
  );

  const courseLessons = markers.reduce((prev, curr) => {
    return [...prev, ...curr.lessons];
  }, []);

  allLessons = allLessons.map(lesson =>
    courseLessons.find(e => e.id == lesson.id)
  );

  allLessons.map(lesson => {
    const lessonWithSubjects = courseLessons.find(e => e.id == lesson.id);

    if (lessonWithSubjects.quiz) {
      return allSubjects.push(lessonWithSubjects);
    }
    return (
      lessonWithSubjects.subjects &&
      lessonWithSubjects.subjects.map(subject => allSubjects.push(subject))
    );
  });

  return {
    allLessons,
    allSubjects
  };
};

export const findSubject = (markers, lessonId, subjectId) => {
  let markerSelected = "";
  const markerWithAccessibleSubject = markers
    .map(marker => {
      console.log("mlessons", marker.lessons);
      return marker.lessons.find(lesson => {
        if (lesson.id == lessonId) {
          markerSelected = marker.name;
        }
        return lesson.id == lessonId;
      });
    })
    .filter(value => {
      if (value !== undefined) {
        return value;
      }
      return false;
    });

  let subjectFound;

  console.log("markerWithAccessibleSubject", markerWithAccessibleSubject);

  if (markerWithAccessibleSubject[0].quiz) {
    subjectFound = markerWithAccessibleSubject;
  } else {
    subjectFound = markerWithAccessibleSubject[0].subjects.find(subject => {
      return subject.id == subjectId;
    });
  }

  console.log("Found subject", subjectFound);

  return {
    marker: markerSelected,
    subject: subjectFound
  };
};

export const getLowestPriceFromPlans = (plans, noPUPC = true) => {
  if (plans.length === 0) return 0;

  let filteredPlans = plans.filter(e => e.provider_name !== "aprendiendo");

  if (noPUPC) {
    filteredPlans = filteredPlans.filter(({ metadata }) => {
      return metadata && Number(metadata.university_id) !== 8;
    });
  }

  const monthlyPrice = filteredPlans[0].metadata
    ? filteredPlans[0].metadata.monthly_price
    : 0;

  let lessValue = monthlyPrice / 100;

  filteredPlans.map(({ metadata }) => {
    if (!Array.isArray(metadata) && metadata !== null) {
      if (metadata.monthly_price / 100 < lessValue) {
        lessValue = metadata.monthly_price / 100;
      }
    }
  });

  return lessValue;
};

export const lightenDarkenColor = (col, amt) => {
  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

export const splitUrl = path => {
  return path.split("/");
};

export const avoidUrlParams = path => {
  const pathIntoArray = splitUrl(path);
  const query = pathIntoArray.filter(string => {
    if (string.charAt(0) === "?") {
      return true;
    } else if (string.indexOf("?") >= 0) {
      return true;
    }
    return false;
  });
  if (query.length > 0) {
    const findIndex = query[0].indexOf("?");
    const returnQuery = query[0].slice(0, findIndex);
    return returnQuery;
  }
  return pathIntoArray.filter(string => Number(string));
};

export const getUrlParams = path => {
  const pathIntoArray = splitUrl(path);
  const query = pathIntoArray.filter(string => {
    if (string.charAt(0) === "?") {
      return true;
    } else if (string.indexOf("?") >= 0) {
      return true;
    }
    return false;
  });
  if (query.length > 0) {
    const findIndex = query[0].indexOf("?");
    const returnQuery = query[0].slice(findIndex);
    return queryString.parse(returnQuery);
  }
  return {};
};

export const isItFeatured = metadata => {
  const isMetadataObject = !Array.isArray(metadata);
  const isFeatured =
    isMetadataObject && metadata && metadata.is_featured === "true";
  return isFeatured;
};

export const withoutAccent = str => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const isExperimentRunning = async () => {
  return new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      if (
        typeof window !== "undefined" &&
        typeof window.google_optimize !== "undefined"
      ) {
        const variant = parseInt(
          window.google_optimize.get(process.env.EXPERIMENT_ID)
        );
        resolve(Boolean(variant));
      }
    }, 1000);
  });
};

export const generateTwoRandomNumbers = maxNumber => {
  let numberOne = 0;
  let numberTwo = 0;
  do {
    numberOne = Math.floor(Math.random() * maxNumber);
  } while (numberOne === numberTwo);

  do {
    numberTwo = Math.floor(Math.random() * maxNumber);
  } while (numberOne === numberTwo);

  return [numberOne, numberTwo];
};

export default {
  strToSlug,
  isObject
};
