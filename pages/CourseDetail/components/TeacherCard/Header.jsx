import React from "react";
import premiumLogo from "assets/images/logo_premium.svg";

import { CourseNameContainer, CourseTitle } from "./styles";

export default function Header({
  isPremium,
  courseName,
  universityColor,
  universityName
}) {
  return (
    <CourseNameContainer>
      {isPremium && (
        <div style={{ display: "flex", marginBottom: 15 }}>
          <div>
            <img src={premiumLogo} alt="premium-logo" />
          </div>
          <div style={{ marginLeft: 10, fontSize: "15px", fontWeight: 600 }}>
            Curso Premium
          </div>
        </div>
      )}
      <CourseTitle>{courseName}</CourseTitle>
      <p
        style={{
          color: universityColor,
          fontWeight: 900,
          fontSize: "16px"
        }}
      >
        {universityName}
      </p>
    </CourseNameContainer>
  );
}
