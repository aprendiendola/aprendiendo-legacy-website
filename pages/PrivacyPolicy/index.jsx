import React from "react";
import { CustomLink } from "components";
import "./styles.scss";

const PrivacyPolicy = () => {
  if (typeof window === "undefined") return null;
  window.scrollTo(0, 0);
  return (
    <div className="condition-container">
      <div className="condition-listContent">
        <ul>
          <CustomLink path="/condiciones-de-uso">
            <li to="condiciones-de-uso">{"Términos y condiciones"}</li>
          </CustomLink>
          <li className="condition-active">{"Políticas de privacidad"}</li>
          <CustomLink path="/preguntas-frecuentes">
            <li>{"Preguntas Frecuentes"}</li>
          </CustomLink>
        </ul>
      </div>
      <div className="condition-viewContent">
        <p className="condition-title-expiration">{"POLÍTICA DE PRIVACIDAD"}</p>

        <div className="condition-line" />

        <h3 className="condition-title-content">
          <strong>1 INTRODUCCIÓN</strong>
        </h3>
        <p className="condition-text-content">
          DIDDLI S.A.C. (en adelante, “Aprendiendo.la”), asegura la máxima
          reserva y protección de aquellos datos personales de los Usuarios del
          sitio web de su propiedad: http://www.aprendiendo.la, que ingresen al
          referido sitio Web. Este documento describe la “Política de
          Privacidad” que regula el tratamiento de los datos personales que los
          Usuarios registran en el sitio Web.
        </p>

        <h3 className="condition-title-content">
          <strong>2 OBJETIVO Y FINALIDAD</strong>
        </h3>

        <p className="condition-text-content">
          En Aprendiendo.la somos conscientes de la elevada consideración que
          tiene la privacidad de nuestros Usuarios y de todas aquellas personas
          que se interesan por nuestros servicios. Siendo consecuentes con esta
          consideración tenemos el compromiso de respetar su privacidad y
          proteger la confidencialidad de su información privada y datos
          personales. En relación a ello, el objetivo de la presente política de
          privacidad informar a nuestros Usuarios la manera en que se recopilan,
          se tratan y se protegen los datos personales que a través de Internet
          son introducidos en el sitio Web.
        </p>

        <p className="condition-text-content">
          La información personal privada no incluye información que está
          disponible en fuentes accesibles al público. Se entiende por tales,
          los medios de comunicación electrónica, óptica y de otra tecnología
          concebidos para facilitar información al público y abiertos a la
          consulta general, las guías telefónicas, los diarios y revistas, los
          medios de comunicación social, las listas profesionales, los
          repertorios de jurisprudencia anonimizados, los Registros Públicos
          administrados por la Superintendencia Nacional de Registros Públicos
          así como cualquier registro o banco de datos calificado como público
          conforme a ley, y la información que ostentan las entidades de la
          Administración Pública y que deba ser entregada a los administrados en
          aplicación de la Ley Nº 27806 - Ley de Transparencia y Acceso a la
          Información Pública.
        </p>

        <p className="condition-text-content">
          El sitio Web ha sido creado y diseñado con la finalidad que
          Aprendiendo.la realice los siguientes servicios (en adelante, los
          “Servicios”), así como facilitar otro tipo de información que creemos
          puede ser de interés y crear así un espacio de comunicación para los
          Usuarios.
        </p>

        <p className="condition-text-content">Servicio:</p>
        <p className="condition-text-content">Servicios de E-Learning</p>

        <h3 className="condition-title-content">
          <strong>3 LEGISLACIÓN.</strong>
        </h3>
        <p className="condition-text-content">
          Esta política está regulada por la legislación peruana y en particular
          por:
        </p>
        <p className="condition-text-content">
          Ley N° 29733 – Ley de Protección de Datos Personales.
        </p>
        <p className="condition-text-content">
          Decreto Supremo N° 003-2013-JUS, Reglamento de la Ley N° 29733.
        </p>
        <p className="condition-text-content">
          Directiva de Seguridad de la Información, aprobada por la Resolución
          Directoral N° 019-2013-JUS/DGPDP.
        </p>
        <p className="condition-text-content">
          De acuerdo con la Ley N° 29733 – Ley de Protección de Datos Personales
          y su Reglamento aprobado por el Decreto Supremo N° 003-2013-JUS, se
          entiende por datos personales toda información numérica, alfabética,
          gráfica, fotográfica, acústica, sobre hábitos personales, o de
          cualquier otro tipo concerniente a una persona natural que la
          identifica o la hace identificable a través de medios que pueden ser
          razonablemente utilizados.
        </p>

        <p className="condition-text-content">
          Asimismo, se entiende por Tratamiento de Datos Personales a cualquier
          operación o procedimiento técnico, automatizado o no, que permite la
          recopilación, registro, organización, almacenamiento, conservación,
          elaboración, modificación, extracción, consulta, utilización, bloqueo,
          supresión, comunicación por transferencia o por difusión o cualquier
          otra forma de procesamiento que facilite el acceso, correlación o
          interconexión de los datos personales.
        </p>

        <p className="condition-text-content">
          Desarrollamos nuestra política de tratamiento de datos personales en
          atención a los principios rectores establecidos en la Ley Nº 29733 -
          Ley de Protección de Datos Personales y, por lo tanto:
        </p>

        <p className="condition-text-content">
          De acuerdo al principio de legalidad, rechaza la recopilación de los
          datos personales de nuestros Usuario por medios fraudulentos,
          desleales o ilícitos.
        </p>

        <p className="condition-text-content">
          Conforme al principio de consentimiento, en el tratamiento de los
          datos personales de nuestros Usuarios mediará su consentimiento.
        </p>

        <p className="condition-text-content">
          Los datos personales de nuestros Usuario se recopilarán para una
          finalidad determinada, explícita y lícita, y no se extenderá a otra
          finalidad que no haya sido la establecida de manera inequívoca como
          tal al momento de su recopilación, excluyendo los casos de actividades
          de valor histórico, estadístico o científico cuando se utilice un
          procedimiento de disociación o anonimización.
        </p>

        <p className="condition-text-content">
          Todo tratamiento de datos personales de nuestros Usuarios será
          adecuado, relevante y no excesivo a la finalidad para la que estos
          hubiesen sido recopilados.
        </p>

        <p className="condition-text-content">
          Los datos personales que vayan a ser tratados serán veraces, exactos
          y, en la medida de lo posible, actualizados, necesarios, pertinentes y
          adecuados respecto de la finalidad para la que fueron recopilados. Se
          conservarán de forma tal que se garantice su seguridad y solo por el
          tiempo necesario para cumplir con la finalidad del tratamiento.
        </p>

        <p className="condition-text-content">
          Aprendiendo.la y, en su caso, los encargados de tratamiento, adoptan
          las medidas técnicas, organizativas y legales necesarias para
          garantizar la seguridad y confidencialidad de los datos personales.
          Aprendiendo.la cuenta con las medidas de seguridad apropiadas y acorde
          con el tratamiento que se vaya a efectuar y con la categoría de datos
          personales de que se trate.
        </p>

        <p className="condition-text-content">
          Aprendiendo.la informa a sus Usuarios que pueden ejercer sus derechos
          contenidos en el derecho constitucional a la protección de datos
          personales en sede administrativa ante la Autoridad Nacional de
          Protección de Datos y en sede jurisdiccional ante el Poder Judicial a
          los efectos del inicio del correspondiente proceso de habeas data.
        </p>

        <p className="condition-text-content">
          Aprendiendo.la garantiza el nivel adecuado de protección de los datos
          personales de sus Usuarios para el flujo transfronterizo de datos
          personales, con un mínimo de protección equiparable a lo previsto por
          la Ley Nº 29733 o por los estándares internacionales de la materia.
        </p>

        <h3 className="condition-title-content">
          <strong>4 INFORMACIÓN</strong>
        </h3>
        <p className="condition-text-content">
          Se informa a los Usuarios que los datos personales que introduzcan en
          los formularios que se encuentran en el apartado “Contáctenos” del Web
          serán tratados por Aprendiendo.la para poder gestionar los comentarios
          que nos hagan en éstos y para poder contactar con estos Usuarios, y se
          regirán por lo expuesto en esta Política de Privacidad.
        </p>
        <p className="condition-text-content" />
        <h3 className="condition-title-content">
          <strong>5 CALIDAD DE LOS DATOS PERSONALES</strong>
        </h3>
        <p className="condition-text-content">
          Los datos personales solicitados a los Usuarios, son datos básicos de
          contacto y son adecuados, pertinentes y no excesivos en relación con
          la finalidad para los que se recogen. Los datos personales a los que
          Aprendiendo.la tendrá acceso serán aquellos que el Usuario facilite
          voluntariamente rellenando los formularios puestos a tal efecto.
        </p>

        <p className="condition-text-content">
          Aprendiendo.la les proporciona a sus Usuarios los recursos técnicos
          adecuados para que tomen conocimiento de la presente Política de
          Privacidad y de cualquier otra información que pueda ser relevante;
          constituyendo el ingreso de Datos Personales o información
          confidencial en el sitio Web, la manifestación expresa de su
          consentimiento a la presente Política de Privacidad.
        </p>
        <p className="condition-text-content">
          Los datos personales facilitados por los Usuarios tienen que ser
          exactos y correctos de forma que respondan con veracidad a su
          situación actual. En caso contrario estos datos serán cancelados.
        </p>
        <p className="condition-text-content">
          Los datos personales facilitados por los Usuarios son recopilados para
          el cumplimiento de las finalidades expuestas en este documento y no se
          usarán para otras finalidades incompatibles con las especificadas.
        </p>
        <p className="condition-text-content">
          Los datos personales serán cancelados cuando hayan dejado de ser
          necesarios para las finalidades para las cuales han sido recopilados.
          Sin embargo, se conservarán durante el tiempo en que pueda exigirse
          algún tipo de responsabilidad a Aprendiendo.la derivada de esta
          relación con los Usuarios.
        </p>

        <h3 className="condition-title-content">
          <strong>
            6 FINALIDAD DE LOS TRATAMIENTOS DE LA INFORMACIÓN PERSONAL
          </strong>
        </h3>
        <p className="condition-text-content">
          Las finalidades de tratamiento de los datos personales que los
          Usuarios introducen en los diferentes formularios del sitio Web son
          para poder dar contestación a las consultas, peticiones y otro tipo de
          información que nos realicen a través de éstos y poder facilitar a
          posteriori cualquier información que Aprendiendo.la crea que puede ser
          de su interés.
        </p>
        <p className="condition-text-content">
          Asimismo, los datos personales proporcionados en nuestras promociones
          o campañas serán tratados para el desarrollo, cumplimiento y ejecución
          de dichas actividades, así como para proporcionar al Usuario
          información acerca de los Servicios de Aprendiendo.la, incluyendo, el
          envío de comunicación electrónica equivalente como SMS, mails y
          llamadas telefónicas.
        </p>
        <p className="condition-text-content">
          En caso el Usuario no desee recibir las comunicaciones comerciales
          señaladas, podrá comunicarlo en cualquier momento al correo:
          info@aprendiendo.la{" "}
        </p>

        <h3 className="condition-title-content">
          <strong>7 TRATAMIENTO DE DATOS PERSONALES Y CONSENTIMIENTO</strong>
        </h3>
        <p className="condition-text-content">
          Los datos personales facilitados por los Usuarios se almacenarán en
          los bancos de datos que forman parte del sistema de información de
          Aprendiendo.la y serán tratados para poder llevar a cabo las
          finalidades expuestas anteriormente.
        </p>
        <p className="condition-text-content">
          Los bancos de datos que contienen datos personales se inscriben en el
          Registro de Protección de Datos de la Autoridad de Protección de Datos
          Personales.
        </p>
        <p className="condition-text-content">
          Los datos personales que faciliten los Usuarios sólo podrán ser
          conocidos y manejados por el personal de Aprendiendo.la que necesite
          conocer dicha información para poder contestar las solicitudes de los
          Usuario. Estos datos personales serán tratados de forma lícita y no
          serán utilizados para otras finalidades incompatibles con las
          especificadas.
        </p>

        <h3 className="condition-title-content">
          <strong>8 COMUNICACIÓN POR TRANSFERENCIA DE DATOS PERSONALES</strong>
        </h3>
        <p className="condition-text-content">
          Aprendiendo.la respeta la privacidad de sus Usuarios, no compartiremos
          su información con terceros si usted no desea expresamente que lo
          hagamos. Asimismo, informamos a los Usuarios que los datos personales
          que nos faciliten no serán comunicados por transferencia a ningún
          tercero que no sea parte de Aprendiendo.la.
        </p>
        <p className="condition-text-content">
          Asimismo, es conveniente que los Usuarios sepan que sus datos
          personales podrán ser comunicados por transferencia a las entidades
          administrativas, autoridades judiciales y/o policiales, siempre y
          cuando esté establecido por Ley.
        </p>

        <h3 className="condition-title-content">
          <strong>9 CONFIDENCIALIDAD DE LOS DATOS PERSONALES</strong>
        </h3>
        <p className="condition-text-content">
          Los datos personales facilitados por los Usuarios serán tratados con
          total confidencialidad.
        </p>
        <p className="condition-text-content">
          Aprendiendo.la se compromete a cumplir con la confidencialidad de la
          Información indefinidamente y garantiza el deber de guardarlos
          adoptando todas las medidas de seguridad necesarias.
        </p>

        <h3 className="condition-title-content">
          <strong>10 SEGURIDAD DE LOS DATOS PERSONALES</strong>
        </h3>
        <p className="condition-text-content">
          Aprendiendo.la tiene implementadas todas las medidas de índole legal,
          técnica y organizativa que derivan en necesarias según la categoría de
          los bancos de datos de su titularidad, con el objeto de garantizar la
          seguridad de los datos personales y evitar posibles contingencias como
          alteración, pérdida y tratamiento y/o acceso no autorizado de los
          datos personales.
        </p>
        <p className="condition-text-content">
          En efecto, para la implementación de las medidas mencionadas,
          Aprendiendo.la tiene en cuenta ciertos criterios como el estado de la
          tecnología, la naturaleza o calidad de los datos almacenados y los
          riesgos a que están expuestos, ya sea que provengan de la acción
          humana, del medio físico o natural, tal y como establece la normativa
          peruana de protección de datos personales.
        </p>
        <p className="condition-text-content">
          Asimismo, tiene implementadas medidas de seguridad adicionales para
          efectos de reforzar la confidencialidad e integridad de la información
          y, además, periódicamente realiza procedimientos de supervisión,
          control y evaluación de los procesos para asegurar la efectiva
          privacidad de los datos personales.
        </p>
        <p className="condition-text-content">
          Sin embargo, la transmisión de información mediante las redes de
          comunicación y de Internet no es totalmente segura; por eso, y a pesar
          de que Aprendiendo.la realizará sus mejores esfuerzos para proteger
          los datos personales, no puede garantizar la seguridad de los mismos
          durante el tránsito hasta el sitio Web. En tal sentido, toda la
          información que los Usuarios proporcionen, se enviará por su cuenta y
          riesgo.
        </p>

        <p className="condition-text-content">
          Es por ello que Aprendiendo.la recomienda la máxima diligencia a sus
          Usuarios cuando trasladen a terceros o publiquen información personal
          para evitar poner en riesgo sus datos personales, eludiendo
          Aprendiendo.la toda responsabilidad en caso de sustracciones,
          modificaciones o pérdidas de datos ilícitas.
        </p>

        <h3 className="condition-title-content">
          <strong>11 EJERCICIO DE DERECHOS</strong>
        </h3>
        <p className="condition-text-content">
          Los Titulares de Datos Personales que hayan facilitado sus datos
          personales a Aprendiendo.la pueden ejercer sus derechos de acceso,
          rectificación cancelación y oposición en los términos recogidos en la
          legislación peruana vigente.
        </p>
        <p className="condition-text-content">
          El ejercicio de dichos derechos se realizará de manera presencial y
          para el caso de no domiciliados, por correo postal, ante
          Aprendiendo.la, ubicada en Calle Bajada Balta 131 oficina 211
          Miraflores o a través del correo electrónico mediante la presentación
          de una solicitud, acreditando su identidad y adjuntando copia de su
          Documento Nacional de Identidad.
        </p>
        <p className="condition-text-content">
          Para ejercer los derechos ya mencionados, es necesario adjuntar en el
          correo postal o correo electrónico, el formulario de ejercicio de
          derechos ARCO que se encuentra adjunto en el Anexo 1, de la presente
          Política de Privacidad.
        </p>

        <h3 className="condition-title-content">
          <strong>12 MENORES DE EDAD</strong>
        </h3>
        <p className="condition-text-content">
          Aprendiendo.la entiende la importancia de proteger la privacidad de
          los niños, especialmente en un entorno online. Por este motivo, el
          sitio Web no está diseñado ni dirigido a menores de 14 años.
        </p>
        <p className="condition-text-content">
          Aprendiendo.la no llevará a cabo voluntariamente el tratamiento de
          datos personales relativos a menores de edad. En el supuesto que se
          tenga conocimiento que los datos personales recogidos corresponden a
          un menor de edad sin autorización, se adoptarán las medidas oportunas
          para eliminar estos datos tan pronto como sea posible.
        </p>

        <h3 className="condition-title-content">
          <strong>13 CONSENTIMIENTO</strong>
        </h3>
        <p className="condition-text-content">
          Al aceptar esta Política de Privacidad, los Usuarios están de acuerdo
          con todos los aspectos expuestos en este documento y nos autorizan a
          tratar sus datos de carácter personal para las finalidades expuestas
          anteriormente.
        </p>

        <h3 className="condition-title-content">
          <strong>14 OTROS</strong>
        </h3>
        <p className="condition-text-content">
          Para realizar cualquier tipo de consulta respecto a esta política
          puede dirigirse a la siguiente dirección de correo electrónico:
          edu@Aprendiendo.la. pe{" "}
        </p>
        <h3 className="condition-title-content">
          <strong>
            15 VIGENCIA Y MODIFICACIÓN DE LA PRESENTE POLÍTICA DE PRIVACIDAD
          </strong>
        </h3>
        <p className="condition-text-content">
          La Política de Privacidad Web de Aprendiendo.la ha sido actualizada el
          mes de marzo del 2016.
        </p>
        <p className="condition-text-content">
          Aprendiendo.la se reserva el derecho a modificar su Política de
          Privacidad Web en el supuesto de que exista un cambio en la
          legislación vigente, doctrinal, jurisprudencial o por criterios
          propios empresariales. Si se introdujera algún cambio en esta
          Política, el nuevo texto se publicará en este mismo Web.
        </p>
        <p className="condition-text-content">
          Se recomienda a los Usuario que accedan periódicamente a esta Política
          de privacidad que encontraran en este mismo sitio Web.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
