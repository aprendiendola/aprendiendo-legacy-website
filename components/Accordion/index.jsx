import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const PlusIcon = () => <span className="accordion-plus-icon" />;

const CheckBoxIcon = () => <span className="accordion-checkbox-icon" />;

class Accordion extends Component {
  state = {
    isExpanded: false,
    contentHeight: "0px"
  };

  componentWillMount() {
    this.setState({ isExpanded: this.props.isExpanded });
  }

  componentDidMount() {
    this.node.style.height = "auto";
    this.setState({ contentHeight: this.node.offsetHeight });
    this.node.style.height = "0px";
  }

  toggleContent = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const {
      heading,
      content,
      type,
      disableClickListener,
      isExpanded,
      noBorder
    } = this.props;

    const isOpen = disableClickListener ? isExpanded : this.state.isExpanded;

    const contentHeight = isOpen ? this.state.contentHeight : "0px";

    if (noBorder) {
      return (
        <div>
          <div
            role="presentation"
            className={`accordion-heading ${
              type && type === "checkbox" ? "accordion-heading-checkbox" : ""
            }`}
            onClick={e => {
              if (e.target.tagName !== "IMG") {
                this.toggleContent();
              }
            }}
          >
            {type && type === "checkbox" ? <div /> : <PlusIcon />}
            {heading}
          </div>

          <div
            className="accordion-content"
            style={{ height: contentHeight }}
            ref={c => (this.node = c)}
          >
            {content}
          </div>
        </div>
      );
    }

    return (
      <div className={`accordion-general ${isOpen ? "active" : "inactive"}`}>
        <div
          role="presentation"
          className={`accordion-heading ${
            type && type === "checkbox" ? "accordion-heading-checkbox" : ""
          }`}
          onClick={e => {
            this.toggleContent();
          }}
        >
          {type && type === "checkbox" ? <div /> : <PlusIcon />}
          {heading}
        </div>

        <div
          className="accordion-content"
          style={{ height: contentHeight }}
          ref={c => (this.node = c)}
        >
          {content}
        </div>
      </div>
    );
  }
}

Accordion.propTypes = {
  /**
   * Header component
   */
  heading: PropTypes.node,
  /**
   * Main content
   */
  content: PropTypes.node,
  isExpanded: PropTypes.bool,
  disableClickListener: PropTypes.bool
};

export default Accordion;
