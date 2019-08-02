import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const VideoToolbarContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #282828;
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
  width: 100%;
  ${breakpoint('sm')`
    background-color: #333;
    justify-content: space-between;
    flex-direction: row;
  `}
`;

const VideoTitle = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  padding: 12px 12px 10px 12px;
  background-color: #333;
  margin-bottom: 2px;
  height: 38px;
  width: 100%;
  ${breakpoint('sm')`
    margin-bottom: 0;
  `}
`;

const MediaPlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  background-color: #333;
  justify-content: space-between;
  width: 100%;
  ${breakpoint('sm')`
    justify-content: flex-end;
  `}
`;

const MaterialButton = styled.button`
  align-items: center;
  border-radius: 5px;
  color: #fff;
  display: flex;
  background-color: ${({ disabled }) => (!disabled ? '#0979f1' : '#58595b')};
  font-size: 12px;
  font-family: Lato;
  font-weight: bold;
  border: none;
  justify-content: center;
  margin-right: 10px;
  width: 118px;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'initial')};
  :hover {
    background-color: ${({ disabled }) => (!disabled ? '#07a4f4' : '#58595b')};
  }
  p {
    padding-top: 2px;
  }
  ${breakpoint('sm')`
    p {
      padding-top: 2px;
    }
  `}
`;

const ActionButton = styled(MaterialButton)`
  color: ${({ disabled }) => (disabled ? '#58595b' : '#fff')};
  background-color: rgba(0, 0, 0, 0);
  margin-right: ${({ marginRight }) => marginRight};
  width: 90px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  :hover {
    background-color: ${({ disabled }) => (!disabled ? '#58595b' : 'rgba(0, 0, 0, 0)')};
  }
`;

const Icon = styled.img`
  width: ${({ maxWidth }) => maxWidth || '8px'};
  height: ${({ maxHeight }) => maxHeight || '14px'};
  margin-right: ${({ marginLeft }) => (marginLeft ? 'initial' : '8px')};
  margin-left: ${({ marginLeft }) => marginLeft || 'initial'};
`;

export {
  ActionButton,
  MaterialButton,
  Icon,
  VideoTitle,
  VideoToolbarContainer,
  MediaPlayerContainer
};
