import {
  isObject,
  areArraysEquals,
  getCurrentEnrollment,
  getAcquiredLesson,
  lessonsAndSubjectsAvailable,
  findSubject
} from './common';

it('check if a value is an object', () => {
  expect(isObject('string')).toBe(false);
  expect(isObject(20)).toBe(false);
  expect(isObject(['string'])).toBe(false);
  expect(isObject({ value: 'string' })).toBe(true);
});

it('check if two params are arrays and equals', () => {
  expect(areArraysEquals([1, 2, 3], [3, 2, 1])).toBe(true);
  expect(areArraysEquals(['3', '2', '1'], [3, 2, 1])).toBe(false);
  expect(areArraysEquals([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
  expect(areArraysEquals({ value: [3, 2, 1] }, [3, 2, 1])).toBe(false);
});

it('should return the enrollment of the course', () => {
  const enrollments = [
    {
      course_id: 1
    },
    {
      course_id: 2
    }
  ];
  expect(getCurrentEnrollment(enrollments, 1)).toEqual({ course_id: 1 });
  expect(getCurrentEnrollment(enrollments, '2')).toEqual({ course_id: 2 });
  expect(getCurrentEnrollment(enrollments, undefined)).toEqual(undefined);
  expect(getCurrentEnrollment(enrollments, 'string')).toEqual(undefined);
});

it('should return the acquired lesson', () => {
  const enrollments = [
    {
      course_id: 1,
      acquired_lessons: { data: [{ id: 'abc' }] }
    },
    {
      course_id: 2,
      acquired_lessons: { data: [{ id: 'xyz' }] }
    }
  ];
  expect(getAcquiredLesson(enrollments, { id: 'xyz' }, 2)).toEqual({ id: 'xyz' });
  expect(getAcquiredLesson(enrollments, { id: 'abc' }, '1')).toEqual({ id: 'abc' });
  expect(getAcquiredLesson(enrollments, { id: 'xyz' }, 3)).toEqual(undefined);
  expect(getAcquiredLesson('', { id: 'abc' }, '1')).toEqual(null);
});

it('should return the lessons and subjects available', () => {
  const enrollments = [
    {
      course_id: 1,
      acquired_lessons: {
        data: [
          {
            id: 'abc',
            subjects: [
              {
                id: 'subject-abc-1'
              },
              {
                id: 'subject-abc-2'
              }
            ]
          },
          {
            id: 'abc-quiz',
            is_free: false,
            score: 20
          },
          {
            id: 'lol',
            subjects: [
              {
                id: 'subject-lol-1'
              },
              {
                id: 'subject-lol-2'
              }
            ]
          },
          {
            id: 'quiz',
            is_free: true,
            score: 20
          }
        ]
      }
    },
    {
      course_id: 2,
      acquired_lessons: { data: [{ id: 'xyz' }] }
    }
  ];
  const markers = {
    PC1: [
      {
        is_free: false,
        id: 'lol'
      },
      {
        is_free: false,
        id: 'abc'
      }],
    PC2: [
      {
        is_free: true,
        id: 'quiz',
        score: 20
      },
      {
        is_free: false,
        id: 'abc-quiz',
        score: 20
      }
    ]
  };

  expect(lessonsAndSubjectsAvailable(enrollments, markers, 2)).toEqual({
    allLessons: [{ is_free: true, id: 'quiz', score: 20 }],
    allSubjects: [{ is_free: true, id: 'quiz', score: 20 }]
  });
  expect(lessonsAndSubjectsAvailable(enrollments, markers, '1')).toEqual({
    allLessons: [{ id: 'lol', subjects: [{ id: 'subject-lol-1' }, { id: 'subject-lol-2' }] }, { id: 'abc', subjects: [{ id: 'subject-abc-1' }, { id: 'subject-abc-2' }] }, { id: 'quiz', is_free: true, score: 20 }, { id: 'abc-quiz', is_free: false, score: 20 }],
    allSubjects: [{ id: 'subject-lol-1' }, { id: 'subject-lol-2' }, { id: 'subject-abc-1' }, { id: 'subject-abc-2' }, { id: 'quiz', is_free: true, score: 20 }, { id: 'abc-quiz', is_free: false, score: 20 }]
  });
  expect(lessonsAndSubjectsAvailable(enrollments, markers, 3)).toEqual({
    allLessons: [{ is_free: true, id: 'quiz', score: 20 }],
    allSubjects: [{ is_free: true, id: 'quiz', score: 20 }]
  });
  expect(lessonsAndSubjectsAvailable('', markers, '1')).toEqual({
    allLessons: [{ is_free: true, id: 'quiz', score: 20 }],
    allSubjects: [{ is_free: true, id: 'quiz', score: 20 }]
  });
});

it('should return the current subject and the marker', () => {
  const markers = {
    PC1: [
      {
        is_free: false,
        id: 'lol',
        subjects: [
          {
            id: 'subject-lol-1'
          },
          {
            id: 'subject-lol-2'
          }
        ]
      },
      {
        is_free: false,
        id: 'abc',
        subjects: [
          {
            id: 'subject-abc-1'
          },
          {
            id: 'subject-abc-2'
          }
        ]
      }],
    PC2: [
      {
        is_free: true,
        id: 'quiz',
        score: 20
      },
      {
        is_free: false,
        id: 'abc-quiz',
        score: 20
      }
    ]
  };

  expect(findSubject(markers, 'lol', 'subject-lol-1')).toEqual({
    marker: 'PC1',
    subject: { id: 'subject-lol-1' }
  });
  expect(findSubject(markers, 'abc', 'subject-abc-2')).toEqual({
    marker: 'PC1',
    subject: { id: 'subject-abc-2' }
  });
  expect(findSubject(markers, 'quiz')).toEqual({
    marker: 'PC2',
    subject: [{
      is_free: true,
      id: 'quiz',
      score: 20
    }]
  });
  expect(findSubject(markers, 'abc-quiz')).toEqual({
    marker: 'PC2',
    subject: [{
      is_free: false,
      id: 'abc-quiz',
      score: 20
    }]
  });
});
