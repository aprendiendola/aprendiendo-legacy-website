import React from "react";
import "./styles.scss";

const data = [
  {
    title: "¿Cómo se paga en Aprendiendo.la?",
    description: "Es muy fácil, tienes 3 opciones:",
    paymentMethods: [
      {
        title: "1.  Tarjeta de crédito:",
        description:
          "Solo debes llenar correctamente los datos como aparecen en tu tarjeta."
      },
      {
        title: "2.  Depósito o transferencia:",
        description: `Haz el pago a través de PagoEfectivo, el cual generará un código de pago (código CIP), que funcionará como número de cuenta. Ingresa a tu banca por internet o acércate al banco que quieras y haz el depósito.
        Puedes ver los detalles según el banco que quieras en el siguiente link:`,
        link: "http://pagoefectivo.pe/donde-pagar/"
      },
      {
        title: "3.  Yape:",
        description:
          "Usa el código QR o el número de teléfono que aparecen en la página, yapeanos y escríbenos tus datos para darte acceso a las clases."
      }
    ]
  },
  {
    title: "¿Cómo se define el precio de los paquetes/combos?",
    description:
      "El precio se define según la cantidad de evaluaciones/examenes que tiene cada curso. Es decir, si el curso solo tiene 4 examenes tendrá un precio X, pero si otro curso tiene 8 examenes tendrá otro precio X mayor debido al número de examenes."
  },
  {
    title: "¿Hasta cuándo puedo ver mis clases?",
    description:
      "Tienes acceso a ver las clases hasta el día del examen que has comprado. ¿Cómo así? Si compraste un paquete para una práctica o examen, tienes acceso hasta el día del examen. En el parcial y final, respectivamente. Todos los accesos son por ciclo, es decir, solo tendrás acceso hasta el examen final."
  }
];

const faqs = data.map((feature, index) => (
  <div className="packages-faqs-item" key={index}>
    <h4 className="packages-faqs-item-title">{feature.title}</h4>
    <div style={feature.paymentMethods && { marginBottom: "15px" }}>
      {feature.description}
    </div>
    {feature.link && <a href={feature.link}>{feature.link}</a>}
    {feature.paymentMethods &&
      feature.paymentMethods.map(method => {
        return (
          <div style={{ paddingLeft: "10px" }}>
            <b>{method.title} </b>
            {method.description}{" "}
            {method.link && <a href={method.link}>{method.link}</a>}
          </div>
        );
      })}
  </div>
));

const Faqs = () => (
  <div className="packages-faqs course-section ">
    <h2 className="packages-faqs-title course-title">Preguntas Frecuentes</h2>
    <div className="packages-faqs-list">
      {faqs}
      <div className="packages-faqs-item">
        <h4 className="packages-faqs-item-title">
          ¿Cómo hago para convertirme en profesor?
        </h4>
        <div>
          Super fácil, solo tienes que llenar la siguiente encuesta y nos
          pondremos en contacto contigo.{" "}
          <a target="blank" href="https://profesores.aprendiendo.la">
            Haz la encuenta aquí
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Faqs;
