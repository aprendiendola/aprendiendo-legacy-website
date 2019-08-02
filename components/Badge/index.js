import React, { Fragment, PureComponent } from 'react';
import { CustomLink } from 'components';
import filledHeartIcon from 'assets/images/icons/filled-heart.svg';
import './styles.scss';

class Badge extends PureComponent {
  tag(number, maxNumber) {
    if (number >= maxNumber) {
      return (
        <span>
          {maxNumber}
+
        </span>
      );
    }
    return (
      <span>
        {number}
      </span>
    );
  }

  render() {
    const { number, url, maxNumber } = this.props;

    return (
      <CustomLink path={url}>
        <div className="badge-wrapper-general">
          <Fragment>
            <img src={filledHeartIcon} alt="wishlist" />
            <div className="badge-general">
              {this.tag(number, maxNumber)}
            </div>
          </Fragment>
        </div>
      </CustomLink>
    );
  }
}

export default Badge;
