import React from 'react';
import { CustomLink } from 'components';
import facebookPixel from 'utils/facebook';
import service from 'services';

import withCart from '../../HOC/WithCart';
import CartButton from './CartButton';
import crownIcon from "assets/images/logo_premium.svg";
import { BuyLinkContainer, BuyLink } from './styles';
import './styles.scss';

const toggleCart = async (cartItems, lesson, course, addItem, removeItem) => {
  facebookPixel.addToCart({
    content_ids: [lesson.id],
    content_type: course.name,
    content_lesson: lesson.name,
    currency: service.getCountry().currency,
    value: parseFloat(course.price_per_lesson)
  });
  const product = {
    id: lesson.id,
    name: lesson.name,
    price: parseFloat(course.price_per_lesson),
    university: course.university.data.name,
    type: 'lessons',
    course: course.id
  };

  const found = cartItems.find(e => e.id === product.id);
  if (found) {
    removeItem(found);
  } else {
    addItem(product);
  }
};

const renderBuyLink = (isLessonAcquired, course) => {
  const buyLinkComponent = (
    <BuyLink disabled={isLessonAcquired}>
      {isLessonAcquired ? 'Adquirido' : 'Comprar'}
    </BuyLink>
  );

  if (!isLessonAcquired) {
    return (
      <BuyLinkContainer>
        <CustomLink path={`/planes/${course.id}`}>
          {buyLinkComponent}
        </CustomLink>
      </BuyLinkContainer>
    );
  }
  return buyLinkComponent;
};

const AccordionHeading = ({
  lesson,
  time,
  isBuyable,
  items,
  course,
  isLessonAcquired,
  addItem,
  removeItem
}) => (
  <div className="lesson-list-heading">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {
        !lesson.is_free && (
          <div>
            <img src={crownIcon} alt="crown" style={{ height: 16 }} />
          </div>
        )
      }
      <div style={{ marginLeft: 5 }}>
        <span>
          {lesson.name}
        </span>
      </div>
    </div>
    <div className="lesson-list-labels">
      {lesson.is_free && (
        <span className="lesson-list-label-free">
          {'Gratis'}
        </span>
      )}
      {!isBuyable ? (
        <span className="lesson-list-label-time">
          {time}
        </span>
      ) : (
        !lesson.is_free && (
          <CartButton
            selectedLessons={items}
            lesson={lesson}
            onClick={() => toggleCart(items, lesson, course, addItem, removeItem)}
          />
        )
      )}
    </div>
  </div>
);

export default withCart(AccordionHeading);
