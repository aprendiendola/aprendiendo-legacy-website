import React from 'react'
import {
  TeacherCardContainer, CardLabel, TeacherInfoContainer, TeacherAvatar
} from './styles'

const TeacherCard = props => {
  const {
    universityName, teacherAvatar, teacherName, courseName
  } = props

  return (
    <TeacherCardContainer>
      <CardLabel fontSize="12px" color="#ff761a" lineHeight="1.5">
        {universityName}
      </CardLabel>
      <CardLabel fontStretch="condensed" fontFamily="Helvetica">
        {courseName}
      </CardLabel>
      <TeacherInfoContainer>
        <TeacherAvatar img={teacherAvatar} />
        <CardLabel fontSize="14px" lineHeight="1.29">
          {teacherName}
        </CardLabel>
      </TeacherInfoContainer>
    </TeacherCardContainer>
  )
}

export default TeacherCard
