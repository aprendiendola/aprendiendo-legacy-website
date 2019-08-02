import React from "react";
import { Label } from "components";
import {
  PlanDescriptionContainer,
  InformationContainer,
  InfoContent,
  DividerContainer,
  Divider
} from "../styles";

const DescriptionPlan = ({ features }) => {
  return (
    <PlanDescriptionContainer>
      <InformationContainer>
        <InfoContent>Renovación Automática</InfoContent>
      </InformationContainer>
      <InformationContainer>
        <InfoContent>Ahorro</InfoContent>
      </InformationContainer>
      <DividerContainer>
        <Divider>
          <Label fontSize="20px" weight="black" color="#414042">
            Incluyen
          </Label>
        </Divider>
      </DividerContainer>
      {features
        .filter(e => e.active)
        .map(({ name }) => {
          return (
            <InformationContainer>
              <InfoContent>{name}</InfoContent>
            </InformationContainer>
          );
        })}
    </PlanDescriptionContainer>
  );
};

export default DescriptionPlan;
