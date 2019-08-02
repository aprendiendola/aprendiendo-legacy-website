import React from "react";
import facebookPixel from "utils/facebook";
import { TitleSection, Label, Button } from "components";
import {
  BecomeTeacherContainer,
  BecomeTeacherImg,
  SpecialTitleSection,
  Ellipse
} from "./styles";

const BecomeTeacher = ({ loggedIn }) => {
  const referralUrl = loggedIn
    ? "https://premium.aprendiendo.la/pe/perfil?referrals=true"
    : "https://premium.aprendiendo.la/pe/login";

  return (
    <BecomeTeacherContainer>
      <BecomeTeacherImg />
      <SpecialTitleSection>
        <TitleSection
          title="Gana S/80 invitando a tus amigos"
          extraTitle
          right
        />
        <Label
          weight="black"
          fontSize="16px"
          color="#414042"
          textAlign="right"
          margin="0 0 10px auto"
        >
          Tú ganas
        </Label>
        <Label
          fontSize="14px"
          color="#626262"
          textAlign="right"
          maxWidth="320px"
          margin="0 0 22px auto"
        >
          <p>
            Por cada amigo que compre un plan con tu link obtendrás{" "}
            <strong>S/20 de descuento</strong> y puedes acumular hasta{" "}
            <strong>S/80</strong> para usarlos en tu siguiente pago.
          </p>
        </Label>
        <Label
          weight="black"
          fontSize="16px"
          color="#414042"
          textAlign="right"
          margin="0 0 10px auto"
        >
          Tu amigo también gana
        </Label>
        <Label
          fontSize="14px"
          color="#626262"
          textAlign="right"
          maxWidth="250px"
          margin="0 0 38px auto"
        >
          <p>
            Tu amigo obtendrá <strong>S/20 de descuento</strong> por la compra
            de cualquier plan.
          </p>
        </Label>
        <Button
          onClick={() => {
            facebookPixel.inviteMyFriends("Home");
            return window.open(referralUrl, "_blank");
          }}
          style={{ background: "#87e400" }}
        >
          <Label color="#fff" weight="black" fontSize="20px" isClickable>
            Invita a tus amigos
          </Label>
        </Button>
      </SpecialTitleSection>
    </BecomeTeacherContainer>
  );
};

export default BecomeTeacher;
