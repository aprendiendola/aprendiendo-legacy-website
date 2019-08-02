import React, { PureComponent } from 'react';
import { Container, CircleButton, Hint } from './styles';

class CircleOptions extends PureComponent {
  static defaultProps = {
    circleCount: 10
  };

  renderCircleButtons = (circleCount, value, fn) => {
    const circleButtons = [];
    for (let i = 0; i <= circleCount; i += 1) {
      circleButtons.push(
        <CircleButton onClick={() => fn(i)} active={value === i}>
          {i}
        </CircleButton>
      );
    }
    return circleButtons;
  };

  render() {
    const {
      hintRight, hintLeft, onClick, circleCount
    } = this.props;
    const { value } = this.props;

    return (
      <div>
        <Container>{this.renderCircleButtons(circleCount, value, onClick)}</Container>
        <Container>
          <Hint>{hintLeft}</Hint>
          <Hint>{hintRight}</Hint>
        </Container>
      </div>
    );
  }
}

export default CircleOptions;
