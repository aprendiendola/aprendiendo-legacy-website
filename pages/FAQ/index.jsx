import React from "react";
import { CustomLink } from "components";
import "./styles.scss";

const FAQ = () => {
  if (typeof window === "undefined") return null;
  window.scrollTo(0, 0);
  return (
    <div className="condition-container">
      <div className="condition-listContent">
        <ul>
          <li>{"Términos y condiciones"}</li>
          <CustomLink path="/politicas-de-privacidad">
            <li>{"Políticas de privacidad"}</li>
          </CustomLink>
          <CustomLink path="/preguntas-frecuentes">
            <li className="condition-active">{"Preguntas Frecuentes"}</li>
          </CustomLink>
        </ul>
      </div>
      <div className="condition-viewContent">
        <p className="condition-title-expiration">PREGUNTAS FRECUENTES</p>
        <div className="condition-line" />
        <p>
          <strong>
            <strong>¿Qué es Aprendiendo.la?</strong>
          </strong>
        </p>
        <p>
          Aprendiendo.la es una plataforma de refuerzo universitario. Ofrecemos
          cursos online para que la rompas en la universidad con profesores que
          conocen los cursos y los personalizan.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>¿Qué son los planes Premium?</strong>
          </strong>
        </p>
        <p>
          Los planes Premium son suscripciones / membresías de renovación
          automática que te dan acceso ilimitado a todos los cursos de tu
          universidad por un tiempo determinado.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿Cuál es la diferencia entre los planes básico, plus y pro?
            </strong>
          </strong>
        </p>
        <p>
          Las suscripciones / membresías se puedes cobrar de forma mensual,
          bimensual, trimestral o cuatrimestral y la única diferencia es el
          costo. Todos te dan acceso ilimitado pero mientras mayor sea el plan
          menor es el costo por mes.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿A qué se refieren con facturado cada X meses o renovación cada X
              meses?
            </strong>
          </strong>
        </p>
        <p>
          Nos referimos a que hacemos un cobro inicial (en el primer pago) del
          costo mensual multiplicado por el número de meses. Los planes Pro y
          Plus se cobra el total al inicio del periodo. Por ejemplo, si
          adquieres el plan Pro de 4 meses y el costo mensual es de 69 soles, al
          hacer el pago se te haría un cobro por 276 soles. Este cobro se
          volverá a hacer de forma automática al término del periodo siempre y
          cuando no se haya cancelado la membresía.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿Puedo guardar los días que te quedan para usarlos más adelante?
            </strong>
          </strong>
        </p>
        <p>
          Claro! A esto le llamamos congelar tu plan. Si quieres poner en pausa
          tu suscripción puedes hacerlo desde tu perfil. Recuerda que el plazo
          máximo por el que puedes congelar tu plan es de 30 días luego de esto
          tu suscripción se reanuda automáticamente.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>¿Puedo cancelar mi plan?</strong>
          </strong>
        </p>
        <p>
          Si consideras que ya no podemos ayudarte puedes cancelar tu plan.
          Puedes hacerlo desde tu perfil, en la pestaña de suscricpión. Recuerda
          que también puedes congelarla y de esta forma aprovechar los días que
          te quedan en el futuro.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>¿Tengo un cobro en mi tarjeta que no he autorizado?</strong>
          </strong>
        </p>
        <p>
          Si encuentras un cobro en tu tarjeta y no lo reconoces asegúrate que
          no sea la renovación de tu plan premium. Recuerda que los planes se
          renuevan automáticamente al término del periodo y en caso el alumno no
          desee mantener el servicio es responsabilidad de él de cancelarlo
          antes de la fecha de renovación. Si consideras que no se trata de una
          renovación o ya has cancelado el servicio y se te ha hecho un cargo
          envíanos la constancia de cancelación (mail de confirmación) y un
          pantallazo del cargo en tu tarjeta a{" "}
          <a href="#!">ayuda@aprendiendo.la</a>. Recuerda que no podremos
          ayudarte si no nos envías esto.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>¿Donde me desuscribo?</strong>
          </strong>
        </p>
        <p>
          Si ya no quieres mantener tu membresía activa puedes cancelarla
          ingresando a tu perfil en la barra superior de tu pantalla donde
          aparece la letra de tu inicial e ingresar a la sección de Suscripción
          en la parte derecha de tu pantalla. Recuerda que también puedes
          congelarla y de esta forma aprovechar los días que te quedas en el
          futuro.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿Congelé mi plan e igual se hizo un cargo en mi tarjeta?
            </strong>
          </strong>
        </p>
        <p style={{ marginBottom: 7 }}>
          Si es así asegúrate que no hayan pasado 30 días desde que lo
          congelaste. Recuerda que el plazo máximo por el que puedes congelar tu
          plan es de 30 días luego de esto tu suscripción se reanuda
          automáticamente. En caso de que congeles tu plan premium el cobro se
          realizará de forma automática en la fecha que corresponda.
        </p>
        <p style={{ marginBottom: 7 }}>
          Los días en los que la cuenta se mantenga en estatus de
          &quot;Congelada&quot; se guardarán y se asignarán como adicionales al
          término del periodo en el que mantengas el acceso en la plataforma por
          el último pago realizado. Si consideras que el error se mantiene y se
          te ha hecho un cargo por error, no te preocupes que lo solucionamos
          inmediatamente.
        </p>
        <p>
          Envíanos la constancia de congelación (mail de confirmación) y un
          pantallazo del cargo en tu tarjeta a
          <a href="#!"> ayuda@aprendiendo.la</a>
          Recuerda que no podremos ayudarte si no nos envías esto.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿Cancelé mi plan e igual se hizo un cargo en mi tarjeta?
            </strong>
          </strong>
        </p>
        <p>
          No te preocupes que lo solucionamos inmediatamente. Envíanos la
          constancia de cancelación (mail de confirmación) y un pantallazo del
          cargo en tu tarjeta a <a href="#!"> ayuda@aprendiendo.la</a>
          Recuerda que no podremos ayudarte si no nos envías esto.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿Yo solo lo compré para un mes y se me ha vuelto a cobrar?
            </strong>
          </strong>
        </p>
        <p>
          Recuerda que las suscripciones tienen cobros mensuales y se generan
          automáticamente, es responsabilidad del estudiante cancelarla si
          considera que ya no es necesario mantener el acceso.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>
              ¿Han eliminado un curso que estaba llevando y ya no me sirve mi
              suscripción?
            </strong>
          </strong>
        </p>
        <p>
          Si es así te sugerimos primero cancelar tu suscrición para que no se
          sigan generando cargos. Posterior a eso escríbenos al correo
          <a href="#!"> ayuda@aprendiendo.la</a> para ayudarte con la solución y
          el reembolso.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>¿Qué pasa si solo lo quiero para un examen?</strong>
        </p>
        <p>
          Lo que te sugerimos hacer es adquirir el plan básico y una vez que
          pase tu examen congelarlo, de esta forma puedes guardar los días
          restantes para próximas evaluaciones o el próximo ciclo.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>¿Cuándo se renueva y cómo?</strong>
          </strong>
        </p>
        <p>
          Tu suscripción se renueva luego de 30 días desde tu ultimo cargo en el
          caso del plan básico. Para los casos de Plus y Pro la renovación
          automática se hace de forma al término del periodo.
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          <strong>
            <strong>¿Dónde me postulo para enseñar?</strong>
          </strong>
        </p>
        <p>
          Si quieres enseñar con nosotros, regístrate en:{" "}
          <a href="https://profesores.aprendiendo.la">
            profesores.aprendiendo.la
          </a>
        </p>
        <p>
          <strong>
            <strong>&nbsp;</strong>
          </strong>
        </p>
        <p>
          Si tienes mas dudas escríbenos a{" "}
          <a href="#!"> ayuda@aprendiendo.la</a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
