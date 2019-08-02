import React, { PureComponent } from 'react';
import starIcon from 'assets/images/star-vector.png';
import './styles.scss';

class TeacherStar extends PureComponent {
  render() {
    const { teacher } = this.props;
    return (
      <div>
        <div className="teacher-star-ratings-sprite" style={{ background: `url(${starIcon}) repeat-x` }}>
          <div
            className="teacher-star-rating-label"
            style={{
              background: `url(${starIcon}) 0px 100% repeat-x`,
              width: `${(teacher.rate / 5) * 100}%`
            }}
          />
        </div>
      </div>
    );
  }
}

export default TeacherStar;
