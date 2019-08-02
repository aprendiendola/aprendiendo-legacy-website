import React, { PureComponent } from 'react';
import facebookPixel from 'utils/facebook';
import { connect } from 'react-redux';
import { avoidUrlParams } from 'utils/common';
import { withRouter } from 'next/router';
import service from 'services';
import Markers from 'components/LessonsList/Markers';
import { IndividualLessonsContainer, Title, Subtitle } from './styles';
import './styles.scss';
import { getCurrentShoppingCart } from 'reducers/shoppingCart';

class IndividualClasses extends PureComponent {
  state = {
    data: false,
    selectedLessons: []
  };

  componentDidMount() {
    const { router: { asPath } } = this.props;
    const getCourseId = avoidUrlParams(asPath);
    this.loadClassesInfo(getCourseId);

    this.getSelectedLessons();
  }

  getSelectedLessons = () => {
    const cartContent = getCurrentShoppingCart();

    const selectedLessons = cartContent.filter(item => item.type === 'lessons').map(item => item.product.id);

    this.setState({ selectedLessons });

    return selectedLessons;
  };

  loadClassesInfo = async id => {
    try {
      const { token } = this.props;
      const { data } = await service.getCourse(id, token);
      if (data) {
        this.setState({ data }, () => {
          facebookPixel.viewContent({
            content_name: 'Individual Classes',
            content_type: data.name
          });
        });
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { data, selectedLessons } = this.state;
    const { addCart, removeItemCart, loadCartContent } = this.props;
    const cartActions = {
      addCart,
      removeItemCart,
      getCartContent: loadCartContent
    };

    return (
      <IndividualLessonsContainer>
        <Title>
          {'Elige tus clases individuales'}
        </Title>
        <Subtitle>
          {data.price_per_lesson
            && `Mira la clase que quieras desde
          ${service.getCountry().currencySymbol} ${data.price_per_lesson} c/u`}
        </Subtitle>

        {data && (
          <Markers
            course={data}
            isBuyable
            cartActions={cartActions}
            selectedLessons={selectedLessons}
            getSelectedLessons={this.getSelectedLessons}
          />
        )}
      </IndividualLessonsContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

export default connect(mapStateToProps)(withRouter(IndividualClasses));
