import React, { PureComponent } from 'react';
import { LargeButton, Review } from 'components';

const DEFAULT_LIMIT = 4;

const ReviewsTitle = ({ showReviewsCount, reviewsCount }) => (
  <h1 style={{ fontWeight: 900, fontSize: '20px' }}>
    {/* {`${showReviewsCount ? reviewsCount : ''} OPINIONES DEL CURSO`} */}
    OPINIONES DEL CURSO
  </h1>
);

const ShowMoreButton = ({ show, onClick, showingMore }) =>
  show && (
    <div style={{ textAlign: 'center' }}>
      <LargeButton style={{ width: '150px', fontSize: 14 }} outlined handleClick={onClick}>
        {showingMore ? '- Mostrar menos' : '+ Mostrar más'}
      </LargeButton>
    </div>
  );

export default class CourseReview extends PureComponent {
  state = {
    limit: DEFAULT_LIMIT
  };

  handleShowButton = (showingMore, reviewsLength) => {
    this.setState({
      limit: showingMore ? DEFAULT_LIMIT : reviewsLength
    });
  };

  render() {
    const { reviews, universityName } = this.props;
    const { limit } = this.state;

    const reviewsLength = reviews.length;
    const hasSurpassedLimit = reviewsLength > DEFAULT_LIMIT;
    const showingMore = limit > DEFAULT_LIMIT;
    return (
      reviewsLength > 0 && (
        <div style={{ marginBottom: 40 }}>
          <ReviewsTitle showReviewsCount={hasSurpassedLimit} reviewsCount={reviewsLength} />
          <div style={{ padding: '20px 0px' }}>
            {reviews.slice(0, limit).map(review => (
              <div style={{ padding: '7px 0px' }}>
                <Review
                  userName={`${review.user.data.name} ${review.user.data.last_name}`}
                  userUniversity={universityName}
                  comment={review.description}
                />
              </div>
            ))}
          </div>
          <ShowMoreButton
            show={hasSurpassedLimit}
            onClick={() => this.handleShowButton(showingMore, reviewsLength)}
            showingMore={showingMore}
          />
        </div>
      )
    );
  }
}
