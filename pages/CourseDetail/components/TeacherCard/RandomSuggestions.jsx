import React, { Component } from "react";
import { generateTwoRandomNumbers } from "utils/common";
import styled from "styled-components";

const Title = styled.p`
  font-weight: 600;
  color: #07a1fb;
`;

const Description = styled.p`
  color: #626262;
`;

const SuggestionContainer = styled.div`
  padding: 5px 0px;
`;

const suggestions = [
  {
    title: "Enseña a los demás",
    description:
      "Enseñar te permite desarrollar tu capacidad de sintetizar y comprender."
  },
  {
    title: "Organízate",
    description:
      "Estudia periódicamente para un examen, no lo dejes para el final."
  },
  {
    title: "Date un respiro",
    description:
      "Alterna entre estudio y descanzo, eso te ayudará a retener mejor los conocimientos."
  },
  {
    title: "Haz un resumen",
    description:
      "Escribe lo que has aprendido, si al leerlo lo entiendes, es que vas por buen camino."
  },
  {
    title: "Encuentra tu lugar ideal",
    description:
      "Busca un lugar tranquilo, te simplificará la vida saber que no tienes que leer de más."
  },
  {
    title: "Prepara un plan de estudios",
    description:
      "Anota los temas a estudiar, te simplificará la vida saber que no tienes que leer de más."
  }
];

const randomIndexs = generateTwoRandomNumbers(suggestions.length);

export default class RandomSuggestions extends Component {
  state = {
    suggestionOne: suggestions[randomIndexs[0]],
    suggestionTwo: suggestions[randomIndexs[1]]
  };

  render() {
    const { suggestionOne, suggestionTwo } = this.state;

    return (
      <div>
        <div style={{ color: "#626262", fontWeight: 900, fontSize: "16px" }}>
          Tips de estudio
        </div>
        <SuggestionContainer>
          <Title>{suggestionOne.title}</Title>
          <Description>{suggestionOne.description}</Description>
        </SuggestionContainer>
        <SuggestionContainer>
          <Title>{suggestionTwo.title}</Title>
          <Description>{suggestionTwo.description}</Description>
        </SuggestionContainer>
      </div>
    );
  }
}
