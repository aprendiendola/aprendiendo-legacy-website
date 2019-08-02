import React from 'react'
import styled from 'styled-components'
import { StickyContainer } from 'react-sticky'
import { Footer } from 'components'

const TemplateContainer = styled(StickyContainer)`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  height: auto;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  > div:first-child {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
`

const HomeTemplate = props => {
  return (
    <TemplateContainer>
      {props.children}
      <Footer />
    </TemplateContainer>
  )
}

export default HomeTemplate
