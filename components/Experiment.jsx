import React from "react";

class Experiment extends React.Component {
  state = {
    isExperimental: false
  };

  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener("load", this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad() {
    setTimeout(() => {
      if (
        typeof window !== "undefined" &&
        typeof window.google_optimize !== "undefined"
      ) {
        const variant = parseInt(
          window.google_optimize.get(process.env.EXPERIMENT_ID)
        );
        this.setState({ isExperimental: Boolean(variant) });
      }
    }, 1000);
  }

  render() {
    const { children } = this.props;
    const { isExperimental } = this.state;

    if (!isExperimental) {
      return null;
    }

    return <div>{children}</div>;
  }
}

export default Experiment;
