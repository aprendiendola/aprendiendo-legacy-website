import React, { Component } from 'react';
import { CustomLink } from 'components';
import { connect } from 'react-redux';
import Button from 'components/Button';
import CardFlag from 'components/CardFlag';
import truncate from 'utils/truncate';
import { strToSlug, isObject } from 'utils/common';
import cardIcon from 'assets/images/star-vector.png';
import eyeIcon from 'assets/images/white-eye.svg';
import playIcon from 'assets/images/play-now-icon.png';
import resumeIcon from 'assets/images/continue-icon.png';
import premiumLogo from 'assets/images/logo_premium.svg';
import { setUser } from 'reducers/auth';
import { setUserEnrollments } from 'reducers/courses';
import './styles.scss';
import service from 'services';
import { PriceCourseCard, LabelCourseCard, ValueCourseCard } from './styles';

const setUrl = ({ id, slug }) => `/cursos/clases/${slug}/${id}`;

class CourseCard extends Component {
  state = {
    loadingFreeze: false
  };

  checkIfFreezed = () => {
    const { loadingFreeze } = this.state;
    const {
      data: { id, is_free: isFree, release_date: releaseDate },
      userEnrollments,
      isAccountFreezed
    } = this.props;

    let courseAcquired;

    if (userEnrollments.length) {
      courseAcquired = userEnrollments.find(enrollment => enrollment.course_id === id);
    }

    if (isAccountFreezed) {
      return (
        <CustomLink path={`/planes/${id}`}>
          <div className="button-wrapper-course-card">
            <Button onClick={() => this.unfreeze()}>{loadingFreeze ? 'Descongelando' : 'Descongelar'}</Button>
          </div>
        </CustomLink>
      );
    }
    if (!isFree && !courseAcquired && !releaseDate) {
      return (
        <CustomLink path={`/planes/${id}`}>
          <div className="button-wrapper-course-card">
            <Button>Comprar</Button>
          </div>
        </CustomLink>
      );
    }
  };

  unfreeze = async () => {
    const {
      slug, id, token, user, setUserToState, setUserEnrollmentsToState
    } = this.props;

    this.setState({
      loadingFreeze: true
    });

    const response = await service.unfreeze(token);

    if (response.status === 500) {
      this.setState(
        {
          errorOnFreeze: true
        },
        () => this.setUrl({ id, slug })
      );
    } else {
      const data = await service.getUserAccess(token);

      setUserEnrollmentsToState(data);
      setUserToState(Object.assign({}, user, { access_type: 'subscribed' }));
      this.setUrl({ id, slug });
    }
    this.setState({
      loadingFreeze: false
    });
  };

  renderActionButton = () => {
    const {
      data: {
        id,
        slug,
        university,
        is_free: isFree,
        formatted_price_per_lesson: formattedPricePerLesson,
        price,
        release_date: releaseDate,
        release_text: releaseText
      },
      userEnrollments,
      lowestPrice,
      isAccountFreezed
    } = this.props;

    const priceToShow = formattedPricePerLesson !== null ? formattedPricePerLesson : lowestPrice;

    if (isAccountFreezed) {
      return {
        infoText: 'Ver ahora',
        action: <img alt="playIcon" src={playIcon} />
      };
    }

    if (userEnrollments && Array.isArray(userEnrollments)) {
      const getCourseEnrollment = userEnrollments.find(enrollment => enrollment.course_id === id);
      const universitySlug = strToSlug(university.data.short_name);

      if (getCourseEnrollment) {
        const {
          acquired_lessons: { data: lessons }
        } = getCourseEnrollment;
        if (lessons.length > 0) {
          let currentLesson = lessons[0];
          let activitySubject;

          if (isObject(getCourseEnrollment.activities)) {
            const foundedLesson = lessons.find(({ id }) => id === getCourseEnrollment.activities.lesson_id);

            if (foundedLesson) {
              activitySubject = currentLesson.subjects.find(
                ({ id }) => getCourseEnrollment.activities.subject_id === id
              );
            }

            currentLesson = foundedLesson || currentLesson;
          }

          const { id: lessonId, subjects } = currentLesson;
          const currentSubject = activitySubject || subjects[0];

          const currentSubjectName = currentSubject ? currentSubject.name : 'None';
          const currentSubjectId = currentSubject ? currentSubject.id : 0;

          const subjectSlug = `${strToSlug(currentSubjectName)}/`;
          const lessonOrSubjectId = `/${lessonId}/${currentSubjectId}`;

          return {
            infoText: isObject(getCourseEnrollment.activities) ? 'Reanudar' : 'Ver ahora',
            action: (
              <img alt="playIcon" src={isObject(getCourseEnrollment.activities) ? resumeIcon : playIcon} />
            ),
            url: `/player/${universitySlug}/${slug}/${subjectSlug}${id}${lessonOrSubjectId}`
          };
        }

        return {
          infoText: 'Ver ahora',
          action: <img alt="playIcon" src={playIcon} />,
          url: `/player/${universitySlug}/${slug}/${id}`
        };
      }
    }

    if (isFree) {
      return {
        infoText: 'Curso',
        action: 'Gratis'
      };
    }

    if (releaseDate) {
      return {
        infoText: 'Disponible en',
        action: releaseText
      };
    }

    return {
      infoText: 'Premium desde',
      action: `${service.getCountry().currencySymbol} ${priceToShow}`
    };
  };

  renderBuyUnfreezeButton = () => {
    const {
      data: { id, slug, is_free: isFree }
    } = this.props;

    if (window.screen.width >= 1024) {
      return (
        <CustomLink path={setUrl({ id, slug })}>
          <div className="overlay-menu-course-card">
            <div className="more-wrapper-course-card">
              <img src={eyeIcon} alt="more" style={{ marginRight: '5px' }} />
              {isFree ? 'Ver curso' : 'Ver más'}
            </div>
            {this.checkIfFreezed()}
          </div>
        </CustomLink>
      );
    }

    return (
      <div className="overlay-menu-course-card">
        <div className="more-wrapper-course-card">
          <img src={eyeIcon} alt="more" style={{ marginRight: '5px' }} />
          {isFree ? 'Ver curso' : 'Ver más'}
        </div>
        {this.checkIfFreezed()}
      </div>
    );
  };

  renderCardFlag = () => {
    const {
      user, data: { is_free: isFree, is_new: isNew, release_date: releaseDate }
    } = this.props;

    let type = null;
    const subscribed = user && user.access_type === 'subscribed';

    if (isFree) {
      type = 'free';
    } else if (releaseDate) {
      type = 'isComingSoon';
    } else if (isNew) {
      type = 'new';
    }

    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 999,
          top: 15,
          display: 'flex'
        }}
      >
        {type && (type !== 'free' || !subscribed) && <CardFlag type={type} />}
        {type !== 'new' && (
          <div style={{ marginLeft: 5, width: 21 }}>
            {type !== 'free' && <img src={premiumLogo} alt="premium-logo" />}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { loadingFreeze } = this.state;
    const {
      data: {
        id,
        name,
        slug,
        university,
        teacher,
        image,
        university: {
          data: { color }
        }
      },
      user,
      isAccountFreezed
    } = this.props;
    const { infoText, action, url } = this.renderActionButton();

    return (
      <div className="container-course-card">
        {this.renderCardFlag()}
        <CustomLink path={setUrl({ id, slug })}>
          <div
            className="top-course-card link-wrapper-course-card"
            style={{
              backgroundImage: `url(${image})`
            }}
          >
            {this.renderBuyUnfreezeButton()}
            <span className="title-course-card">{truncate(name.toUpperCase(), 40)}</span>
          </div>
        </CustomLink>
        <CustomLink path={url || setUrl({ id, slug })}>
          <div
            className="bar-course-card"
            style={{
              borderColor: color,
              color
            }}
          >
            {!user && (university.data.name.length > 20 ? university.data.short_name : university.data.name)}
          </div>
        </CustomLink>
        <CustomLink path={url || setUrl({ id, slug })}>
          <div className="link-wrapper-course-card">
            <div className="bottom-course-card">
              <span>con {teacher.data.name}</span>
              <div className="indicators-course-card">
                <div>
                  <div
                    className="star-ratings-sprite-course-card"
                    style={{ background: `url(${cardIcon}) repeat-x` }}
                  >
                    <div
                      className="star-rating-label-course-card"
                      style={{
                        background: `url(${cardIcon}) 0px 100% repeat-x`,
                        width: `${(teacher.data.rate / 5) * 100}%`,
                        marbinBottom: '20px'
                      }}
                    />
                  </div>
                </div>
                <div className="price-course-card">
                  <PriceCourseCard>
                    <LabelCourseCard hasPrice={infoText === 'Desde'} style={{ fontWeight: 'bold' }}>
                      {infoText}
                    </LabelCourseCard>
                    <ValueCourseCard hasPrice={infoText === 'Desde'}>{action}</ValueCourseCard>
                  </PriceCourseCard>
                </div>
              </div>
            </div>
          </div>
        </CustomLink>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setUserToState: user => setUser(user),
  setUserEnrollmentsToState: data => setUserEnrollments(data)
};

const mapStateToProps = ({ courses, auth }) => {
  return {
    token: auth.token,
    user: auth.user,
    userEnrollments: courses.userEnrollments
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCard);
