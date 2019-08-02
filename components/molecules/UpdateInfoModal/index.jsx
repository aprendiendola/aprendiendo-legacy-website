import React, { PureComponent } from 'react';
import DefaultModal from 'components/atoms/DefaultModal';
import { TitleSection, LargeButton } from 'components';
import Select from 'components/Select';

const APRENDIENDO_UNIVERSITY_ID = 7;

class UpdateInfoModal extends PureComponent {
  state = {
    selectedUniversityId: null
  };

  componentWillReceiveProps(nextProps) {
    const { universities } = nextProps;

    if (universities.length > 0) {
      this.setState({ selectedUniversityId: universities[0].id });
    }
  }

  handleChange = value => {
    this.setState({ selectedUniversityId: value });
  };

  render() {
    const { selectedUniversityId } = this.state;
    const { show, universities, onSubmit } = this.props;

    if (!show) {
      return null;
    }

    return (
      <DefaultModal active={show} handleClose={() => {}}>
        <div className="box" style={{ padding: '34px', maxWidth: '500px', width: '100%' }}>
          <TitleSection subTitle="Hola, nos dimos cuenta que aún no has escogido tu unversidad. Escoge una:" />
          {universities.length > 0 && (
            <div>
              <div>
                <Select
                  id="university"
                  label="Universidad"
                  handleChange={e => this.handleChange(e.target.value)}
                  value={selectedUniversityId}
                  placeholder="Selecciona tu universidad"
                  items={universities.filter(({ id }) => id !== APRENDIENDO_UNIVERSITY_ID)}
                />
              </div>
              <div style={{ textAlign: 'right' }}>
                <LargeButton
                  style={{ padding: '0px 16px' }}
                  handleClick={() => onSubmit(selectedUniversityId)}
                >
                  Guardar
                </LargeButton>
              </div>
            </div>
          )}
        </div>
      </DefaultModal>
    );
  }
}

export default UpdateInfoModal;
