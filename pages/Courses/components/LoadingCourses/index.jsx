import React, { PureComponent } from 'react';
import {
  Container, CardContainer, ImgCard, ContentContainer, Line, RatingPriceContainer
} from './styles';

class LoadingCourses extends PureComponent {
  renderLoadingCards = () => {
    const loadingCards = [];

    for (let i = 0; i <= 11; i += 1) {
      loadingCards.push(
        <CardContainer key={i}>
          <ImgCard />
          <ContentContainer>
            <Line height="12px" marginBottom="5px" />
            <Line height="12px" width="60%" marginBottom="10px" />
            <RatingPriceContainer>
              <Line width="35%" height="17px" />
              <Line width="35%" height="17px" alignSelf="flex-end" />
            </RatingPriceContainer>
          </ContentContainer>
        </CardContainer>
      );
    }

    return loadingCards;
  };

  render() {
    return (
      <Container>
        {this.renderLoadingCards()}
      </Container>
    );
  }
}

export default LoadingCourses;
