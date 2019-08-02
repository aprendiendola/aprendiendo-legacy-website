import React, { Component } from 'react';
import services from 'services';

class Barriers extends Component {
  state = {
    barrierProgress: [],
    visible: true
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.loadBarrierProgress(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps;
    if (token) {
      this.loadBarrierProgress(token);
    }
  }

  loadBarrierProgress = async token => {
    const { data } = await services.getBarriers(token);
    this.setState({
      barrierProgress: data
    });
  };

  render() {
    const { barrierProgress, visible } = this.state;
    const { user } = this.props;

    if (!visible) {
      return false;
    }

    return (
      <div
        style={{
          position: 'fixed',
          padding: '10px',
          background: '#626262',
          color: '#fff',
          fontWeight: 600,
          width: '380px',
          opacity: 0.7,
          zIndex: 9999
        }}
      >
        <p>- Barreras</p>
        {user ? (
          <div>
            {user.name}
            <ul>
              {user.barriers.map(e => {
                return (
                  <li>
                    ii - {e.description} | {e.is_active ? 'Activado' : 'Desactivado'}
                  </li>
                );
              })}
            </ul>
            <p>- CONSUMO</p>
            <ul>
              {barrierProgress.map(barrier => {
                return (
                  <div>
                    <li>
                      {Object.keys(barrier).map(key => {
                        return <p>{`${key}: ${barrier[key]}`}</p>;
                      })}
                    </li>
                    <hr />
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>No estás logueado !</div>
        )}
      </div>
    );
  }
}

export default Barriers;
