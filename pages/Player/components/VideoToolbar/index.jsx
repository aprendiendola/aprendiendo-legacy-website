import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from './components/Modal';
import downloadFile from 'assets/images/download-file.svg';
import disabledLeftArrow from 'assets/images/disable-left-arrow.svg';
import leftArrow from 'assets/images/left-arrow.svg';
import disabledRightArrow from 'assets/images/disable-right-arrow.svg';
import rightArrow from 'assets/images/right-arrow.svg';
import {
  MaterialButton,
  ActionButton,
  Icon,
  VideoTitle,
  VideoToolbarContainer,
  MediaPlayerContainer
} from './styles';

class VideoToolbar extends Component {
  state = {
    showModal: false,
    lessonResources: null
  };

  componentDidMount() {
    const {
      lessonsAndSubjects: { allLessons },
      currentLessonId
    } = this.props;
    const resources = allLessons.find(({ id }) => {
      return id === currentLessonId;
    });
    this.setState({ lessonResources: resources });
  }

  onHideModal = () => {
    this.setState({ showModal: false });
  };

  onSubjectChange = prev => {
    const {
      subjectSelected,
      onNewSubject,
      lessonsAndSubjects: { allLessons, allSubjects }
    } = this.props;
    const subjectSelectedIndex = allSubjects.findIndex(subject => subject.id === subjectSelected.id);
    const prevOrNextIndex = prev === 'prev' ? subjectSelectedIndex - 1 : subjectSelectedIndex + 1;
    const newSubject = allSubjects[prevOrNextIndex];
    const newLesson = allLessons.find(lesson => {
      if (lesson.score) {
        return lesson.id === newSubject.id;
      }
      return lesson.subjects.find(subject => subject.id === newSubject.id);
    });

    onNewSubject(newSubject, newLesson);
  };

  static getDerivedStateFromProps(nextProps) {
    const {
      lessonsAndSubjects: { allLessons },
      currentLessonId
    } = nextProps;
    const resources = allLessons.find(({ id }) => {
      return id === currentLessonId;
    });

    return {
      lessonResources: resources
    };
  }

  render() {
    const { subjectSelected, isDisabledButtons } = this.props;
    const { showModal, lessonResources } = this.state;

    return (
      <Fragment>
        {lessonResources && (
          <Modal
            showModal={showModal}
            onHideModal={this.onHideModal}
            subTitle={lessonResources.name}
            materials={lessonResources.file_paths}
          />
        )}
        <VideoToolbarContainer>
          <VideoTitle>{subjectSelected && subjectSelected.name}</VideoTitle>
          <MediaPlayerContainer>
            {lessonResources && (
              <MaterialButton
                title="Descarga el material"
                disabled={lessonResources.file_paths.length === 0}
                onClick={() => this.setState({ showModal: true })}
              >
                <Icon
                  alt="download"
                  src={downloadFile}
                  maxWidth="10px"
                  maxHeight="20px"
                />
                <p>Material</p>
              </MaterialButton>
            )}

            <ActionButton
              disabled={isDisabledButtons.prev}
              marginRight="5px"
              onClick={() => this.onSubjectChange('prev')}
            >
              <Icon
                alt="download"
                src={
                  isDisabledButtons.prev
                    ? disabledLeftArrow
                    : leftArrow
                }
                maxWidth="12px"
              />
              <p>Anterior</p>
            </ActionButton>
            <ActionButton disabled={isDisabledButtons.next} marginRight="5px" onClick={this.onSubjectChange}>
              <p>Siguiente</p>
              <Icon
                alt="download"
                src={
                  isDisabledButtons.next
                    ? disabledRightArrow
                    : rightArrow
                }
                marginLeft="6px"
                maxWidth="12px"
              />
            </ActionButton>
          </MediaPlayerContainer>
        </VideoToolbarContainer>
      </Fragment>
    );
  }
}

VideoToolbar.propTypes = {
  currentLessonId: PropTypes.string.isRequired,
  subjectSelected: PropTypes.object.isRequired,
  onNewSubject: PropTypes.func.isRequired,
  lessonsAndSubjects: PropTypes.object.isRequired,
  isDisabledButtons: PropTypes.object.isRequired
};

export default VideoToolbar;
