import React from 'react';
import { CustomLink } from 'components';
import './styles.scss';

const UseConditions = () => {
  if (typeof window === 'undefined') return null;
  window.scrollTo(0, 0);
  return (
    <div className="condition-container">
      <div className="condition-listContent">
        <ul>
          <li className="condition-active">
            {'Términos y condiciones'}
          </li>
          <CustomLink path="/politicas-de-privacidad">
            <li>
              {'Políticas de privacidad'}
            </li>
          </CustomLink>
          <CustomLink path="/preguntas-frecuentes">
            <li>
              {'Preguntas Frecuentes'}
            </li>
          </CustomLink>
        </ul>
      </div>
      <div className="condition-viewContent">
        <p className="condition-title-expiration">
          {'TERMINOS Y CONDICIONES'}
        </p>

        <div className="condition-line" />

        <p>Los presentes T&eacute;rminos y Condiciones (en adelante, las &ldquo;Condiciones&rdquo;) regulan el uso del sitio web&nbsp;<a href="http://www.aprendiendo.la/">www.aprendiendo.la</a>&nbsp;(en adelante, el &ldquo;sitio Web&rdquo;), ya sea con su actual nombre o con cualquier otra denominaci&oacute;n con la que pueda figurar en el futuro, Aprendiendo.la Inc, con EIN N&deg; 38-4103641 y domicilio para estos efectos en 6303 Blue Lagoon Drive, Suite 200, Miami, FL, 33126, y direcci&oacute;n de email&nbsp;<a href="mailto:info@aprendiendo.la"><u>info@aprendiendo.la</u></a>&nbsp;(en adelante, &ldquo;<strong><strong>Aprendiendo.la</strong></strong>&rdquo;). Al acceder y utilizar este sitio Web, usted (&ldquo;Usuario&rdquo;) reconoce que ha le&iacute;do y aceptado estas Condiciones y se compromete a cumplir con todas las Condiciones.&nbsp;<strong><strong>Aprendiendo.la</strong></strong>&nbsp;se reserva el derecho de modificar en cualquier momento las Condiciones, as&iacute; como cualesquiera otras condiciones generales o particulares que resulten de aplicaci&oacute;n. Asimismo,&nbsp;<strong><strong>Aprendiendo.la</strong></strong>&nbsp;se reserva el derecho de suspender, interrumpir o dejar de operar el sitio Web, cuentas, usuarios tanto de pago como de no pago en cualquier momento.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>2 DEFINICIONES</strong></strong></p>
        <p>&ldquo;Usuario o Usuarios&rdquo;: Usuarios Profesores y Usuarios Estudiantes, es decir, todo aquel que utilice el sitio Web.</p>
        <p>&ldquo;Usuario Profesor&rdquo;: aquel usuario que suscribe un acuerdo de colaboraci&oacute;n con <strong><strong>Aprendiendo.la</strong></strong>&nbsp;con la finalidad de poder utilizar el sitio Web para brindar asesor&iacute;a educativa de cursos universitarios.</p>
        <p>&nbsp;</p>
        <p>&ldquo;Usuario Estudiante&rdquo;: aquel usuario que se registra en el sitio Web con la finalidad de recibir asesor&iacute;a educativa de cursos universitarios. &ldquo;Servicios&rdquo;:&nbsp;<strong><strong>Aprendiendo.la </strong></strong>brinda servicios de asesor&iacute;a universitaria a trav&eacute;s de un formato digital de e-learning. Adem&aacute;s, brinda la posibilidad de comunicaci&oacute;n entre estudiantes universitarios y la posibilidad de compartir recursos a trav&eacute;s de la plataforma.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>3 &iquest;QU&Eacute; ES APRENDIENDO.LA?</strong></strong></p>
        <p>Aprendiendo.la es una plataforma web y m&oacute;vil que brinda asesor&iacute;as universitarias a trav&eacute;s de una plataforma de e-learning. Brinda tambi&eacute;n un espacio para la comunicaci&oacute;n entre estudiantes universitarios y almacenamiento en la nube de recursos en diferentes formatos con la posibilidad de ser descargados.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>4 DATOS FACILITADOS POR LOS USUARIOS</strong></strong></p>
        <p>El acceso a los servicios que brinda Aprendiendo.la en el sitio Web estar&aacute; sujeto en todo caso al previo registro del Usuario mediante el cumplimiento y completado del correspondiente formulario (&ldquo;Formulario de Registro&rdquo;), que ser&aacute; previamente facilitado al Usuario. Aprendiendo.la se reserva el derecho de aceptar o rechazar libremente la solicitud de registro por parte del Usuario. Los datos introducidos por el Usuario en el Formulario de Registro deber&aacute;n ser exactos, actuales y veraces en todo momento.</p>
        <p>El acceso y uso del sitio Web estar&aacute; sujeto a una contrase&ntilde;a creada por el Usuario al rellenar el Formulario de Registro o al acceso a trav&eacute;s de otras plataformas (Facebook, Google entre otras) y el acceso se reputar&aacute; realizado por dicho Usuario, quien responder&aacute; en todo caso de tal acceso y uso. El Usuario ser&aacute; responsable en todo momento de la custodia de su contrase&ntilde;a, asumiendo, en consecuencia, cualesquiera da&ntilde;os y perjuicios que pudieran derivarse de su uso indebido, as&iacute; como de la cesi&oacute;n, revelaci&oacute;n o extrav&iacute;o de la misma. En caso de olvido de la contrase&ntilde;a o cualquier otra circunstancia que suponga un riesgo de acceso y/o utilizaci&oacute;n por parte de terceros no autorizados, el Usuario lo comunicar&aacute; inmediatamente a Aprendiendo.la a fin de que &eacute;ste proceda inmediatamente al bloqueo y sustituci&oacute;n de la misma. En todo caso, cualesquiera operaciones realizadas antes de dicha comunicaci&oacute;n se reputar&aacute;n efectuadas por el Usuario, quien ser&aacute; responsable da&ntilde;os que se deriven de cualquier acceso y/o uso no autorizado que se realice con anterioridad a dicha comunicaci&oacute;n.</p>
        <p>Los datos facilitados por el Usuario pasar&aacute;n a integrarse en un banco de datos, los cuales ser&aacute;n tratados acorde con la Pol&iacute;tica de Privacidad de Aprendiendo.la, que puede encontrar en este mismo sitio Web.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>5 CONDICIONES DE USO</strong></strong></p>
        <p>Estas condiciones de uso tienen por objeto regular el acceso y la utilizaci&oacute;n del sitio Web que Aprendiendo.la pone a disposici&oacute;n de los Usuarios para brindar los Servicios.</p>
        <p>Aprendiendo.la se reserva el derecho a modificar en cualquier momento la presentaci&oacute;n, la configuraci&oacute;n y ubicaci&oacute;n del sitio Web, as&iacute; como las correspondientes condiciones de acceso y uso. Aprendiendo.la no garantiza que el contenido proporcionado a trav&eacute;s del sitio Web ser&aacute; en todo caso correctos, completos o actualizados.</p>
        <p>El Usuario se obliga a hacer un uso correcto del sitio Web de conformidad con la legislaci&oacute;n local vigente y con las condiciones incluidas en este documento. El Usuario responder&aacute; frente a Aprendiendo.la o frente a terceros, por cuales quiera da&ntilde;o y/o perjuicio que pudiera causarse como consecuencia del incumplimiento de dichas obligaciones.</p>
        <p>Queda expresamente prohibido el uso del sitio Web con fines lesivos de bienes o intereses de Aprendiendo.la o de terceros o que de cualquier otra forma sobrecarguen, da&ntilde;en o inutilicen las redes, servidores y dem&aacute;s equipos inform&aacute;ticos o productos y aplicaciones inform&aacute;ticas de Aprendiendo.la o de terceros.</p>
        <p>Aprendiendo.la se reserva la facultad de efectuar, en cualquier momento y sin necesidad de previo aviso las modificaciones y actualizaciones de la informaci&oacute;n contenida en el sitio Web que resulten pertinentes, as&iacute; como de la configuraci&oacute;n y presentaci&oacute;n de este, y de sus Condiciones Generales de Uso.</p>
        <p>La prestaci&oacute;n del servicio del sitio Web tiene una duraci&oacute;n limitada al momento en el que el Usuario se encuentre conectado al mismo o a alguno de los servicios que a trav&eacute;s de &eacute;ste se facilitan. Por eso, se recomienda que los Usuarios lean, atenta y detenidamente, estas Condiciones Generales de Uso en cada una de las ocasiones en que se propongan entrar y hacer uso del sitio Web, puesto que la misma puede estar sujeto a modificaciones.</p>
        <p>Tanto el acceso al sitio Web como el uso no autorizado que pueda efectuarse de la informaci&oacute;n contenida en el mismo es responsabilidad exclusiva de quien lo realiza.</p>
        <p>Aprendiendo.la no responder&aacute; de ninguna consecuencia, da&ntilde;o o perjuicio que pudieran derivarse de este acceso o uso. Aprendiendo.la no se hace responsable de los errores de seguridad, que se puedan producir ni de los da&ntilde;os que puedan producirse en el sistema inform&aacute;tico del Usuario, o a los ficheros o documentos almacenados en el mismo, como consecuencia de la presencia de un software malicioso en el ordenador del Usuario que sea utilizado para la conexi&oacute;n a los contenidos del sitio Web, de un mal funcionamiento del navegador o del uso de versiones no actualizadas del navegador. Si cualquier Usuario considera que el contenido o los servicios prestados por los sitios Webs enlazados son il&iacute;citos o lesionan bienes o derechos del propio Usuario o de un tercero, y que esto puede dar m&eacute;rito del pago de una indemnizaci&oacute;n, tendr&aacute; que notificarlo a Aprendiendo.la.</p>
        <p>En particular, las referidas actividades o contenidos il&iacute;citos pueden ser aquellos que consistan en: actividades o contenidos susceptibles de ser considerados delictivos conforme la normativa penal, actividades o contenidos que violen derechos de propiedad intelectual o industrial, actividades o contenidos que pongan en peligro el orden p&uacute;blico, la investigaci&oacute;n penal, la seguridad p&uacute;blica, actividades o contenidos que pongan en peligro la protecci&oacute;n de la salud p&uacute;blica, el respeto a la dignidad de la persona y al principio de no discriminaci&oacute;n y la protecci&oacute;n de la salud y la infancia.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>6 PROCEDIMIENTO EN CASO DE REALIZACI&Oacute;N DE ACTIVIDADES DE CAR&Aacute;CTER IL&Iacute;CITO</strong></strong></p>
        <p>Si un Usuario considera que existen hechos o circunstancias que revelen el car&aacute;cter il&iacute;cito de la utilizaci&oacute;n de cualquier contenido y/o de la realizaci&oacute;n de cualquier actividad en el sitio Web, y en particular, de la violaci&oacute;n de derechos de propiedad intelectual o industrial (patentes, modelos y dibujos industriales, marcas y nombres comerciales, etc.) u otros derechos, tendr&aacute; que enviar una notificaci&oacute;n a Aprendiendo.la con el siguiente contenido:</p>
        <p>Datos de la persona o entidad que hace la reclamaci&oacute;n: nombre, direcci&oacute;n, tel&eacute;fono y direcci&oacute;n de correo electr&oacute;nico.</p>
        <p>Descripci&oacute;n de la supuesta actividad il&iacute;cita llevada a cabo en el sitio Web y, en particular, cuando se trate de una supuesta violaci&oacute;n de derechos, la indicaci&oacute;n precisa y concreta de los contenidos protegidos, as&iacute; como de su localizaci&oacute;n en el sitio Web, y los hechos o circunstancias que revelan el car&aacute;cter il&iacute;cito de esta actividad.</p>
        <p>Firma manuscrita o equivalente, con los datos personales del titular de los derechos supuestamente infringidos o de la persona autorizada para actuar en nombre y por cuenta de esta.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>7 DATOS DE CONTACTO DE APRENDIENDO.LA</strong></strong></p>
        <p>Se pone a disposici&oacute;n de los Usuarios de Internet la siguiente informaci&oacute;n para poder dirigir sus peticiones, cuestiones y quejas:</p>
        <p><strong><strong>Nombre:</strong></strong>&nbsp;Aprendiendo.la Inc.</p>
        <p><strong><strong>Direcci&oacute;n:</strong></strong>&nbsp;6303 Blue Lagoon Drive, Suite 200, Miami, FL, 33126.</p>
        <p><strong><strong>Correo electr&oacute;nico:</strong></strong>&nbsp;info@aprendiendo.la</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>8 LIMITACIONES DE RESPONSABILIDAD</strong></strong></p>
        <p>Aprendiendo.la no garantiza la inexistencia de interrupciones o errores en el acceso al sitio Web o a su contenido, ni que &eacute;ste se encuentre actualizado. Aprendiendo.la llevar&aacute; a cabo, siempre que no implique causas que lo hagan imposible o de dif&iacute;cil ejecuci&oacute;n, y tan pronto tenga noticia de los errores, desconexiones o falta de actualizaci&oacute;n en los contenidos, todas aquellas tareas necesarias para resolver los errores, restablecer la comunicaci&oacute;n y actualizar los contenidos.</p>
        <p>Aprendiendo.la no asume ninguna responsabilidad derivada de los contenidos en el sitio Web, ni garantiza la ausencia de software malicioso u otros elementos en los mismos que puedan producir alteraciones en el sistema inform&aacute;tico, en los documentos o en los ficheros del Usuario, excluyendo cualquier responsabilidad por los da&ntilde;os de cualquier tipo causados por este motivo.</p>
        <p>Los Usuarios, garantizan que son propietarios de cualquier contenido que suba al sitio Web, por lo cual asume total responsabilidad. En ese sentido, los Usuarios liberan de responsabilidad a Aprendiendo.la por cualquier da&ntilde;o generado por contenido que suba este &uacute;ltimo al sitio Web.</p>
        <p>Aprendiendo.la no ser&aacute; responsable por cualquier informaci&oacute;n no elaborada por ella o no publicada de forma autorizada por ella bajo su nombre, al igual que la responsabilidad que se derive de la mala utilizaci&oacute;n de los contenidos. En ese sentido, Aprendiendo.la se reserva el derecho a actualizarlos, a eliminarlos, limitarlos o impedir el acceso a ellos, de manera temporal o definitiva.</p>
        <p>Aprendiendo.la establece claramente que la contrataci&oacute;n de sus servicios por parte de los Usuarios Estudiantes no garantiza resultado alguno.</p>
        <p>&nbsp;</p>
        <p>El cliente declara entender que el l&iacute;mite de acceso a la plataforma por usuario es a trav&eacute;s de un dispositivo, en caso el &ldquo;Usuario Estudiante&rdquo; intente ingresar con un segundo dispositivo, el acceso ser&aacute; restringido y la membres&iacute;a cancelada si La Empresa decide hacerlo.</p>
        <p>&nbsp;</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>9 ENLACES</strong></strong></p>
        <p>El establecimiento de un enlace al sitio Web, implica la existencia de relaciones pasadas o presentes entre Aprendiendo.la y el propietario del sitio Web donde se establezca, no implica por parte de Aprendiendo.la ni la aceptaci&oacute;n ni la aprobaci&oacute;n de sus contenidos o servicios.</p>
        <p>Queda expresamente prohibido cualquier otro aprovechamiento de los contenidos del sitio Web, a favor de terceros no autorizados.</p>
        <p>Aprendiendo.la no asume ninguna responsabilidad por la informaci&oacute;n contenida en sitios Webs de terceros a los que se pueda acceder por enlaces o buscadores desde el Web.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>10 CONDICIONES DE PAGO Y FACTURACI&Oacute;N</strong></strong></p>
        <p>Las tarifas aplicables ser&aacute;n cobradas por Aprendiendo.la de forma autom&aacute;tica, una vez el Usuario Estudiante confirme que Servicios requerir&aacute;, a trav&eacute;s de los datos de la tarjeta de cr&eacute;dito facilitados por el Usuario Estudiante en el Formulario de Registro.</p>
        <p>Las tarifas cobradas no ser&aacute;n reembolsables. Las tarifas y los gastos de cancelaci&oacute;n y compensaci&oacute;n, as&iacute; como sus actualizaciones, est&aacute;n disponibles en todo momento en el sitio Web y est&aacute;n sujetas a posibles modificaciones. Se recomienda al Usuario Estudiante que acceda peri&oacute;dicamente al sitio Web para conocer las tarifas aplicables en cada momento.</p>
        <p>Asimismo, todas las promociones y descuentos, as&iacute; como sus condiciones de uso, estar&aacute;n disponibles en el sitio Web. Aprendiendo.la se reserva el derecho a restringir el uso y a recuperar el importe de las promociones, invitaciones y descuentos a aquellos Usuarios Estudiante que hagan un uso inadecuado, il&iacute;cito o abusivo de los mismos.</p>
        <p>Con arreglo a lo dispuesto en la Pol&iacute;tica de Privacidad, los datos de la tarjeta de cr&eacute;dito facilitados ser&aacute;n remitidos a la empresa proveedora de pagos y encargada de almacenar dichos datos del Usuario. El Usuario Estudiante deber&aacute; acceder o podr&aacute; ser redirigido al sitio Web del proveedor de pagos a trav&eacute;s del enlace facilitado al efecto en el Formulario de Registro. En todo caso se recomienda al Usuario Estudiante consultar los t&eacute;rminos y condiciones de uso y las pol&iacute;ticas de privacidad de los sitios Web de terceros a los que accedan a trav&eacute;s de enlaces incluidos en el sitio Web.</p>
        <p>Las facturas estar&aacute;n a disposici&oacute;n del Usuario Estudiante en las oficinas de Aprendiendo.la sin perjuicio de que puedan consultarlas a trav&eacute;s del sitio Web. &nbsp;En caso de solicitarlo expresamente, las facturas ser&aacute;n remitidas al Usuario en la direcci&oacute;n indicada al efecto.</p>
        <p>Los cargos realizados en tarjetas de cr&eacute;dito o d&eacute;bito emitidas en Per&uacute; que el Usuario Estudiante configure como pago en Nuevos Soles (PEN), se le solicitar&aacute;n al banco emisor que se realicen en Nuevos Soles (PEN). Sin embargo, algunos bancos emisores no soportan esta opci&oacute;n y podr&aacute;n cobrar al cliente en d&oacute;lares americanos (USD) al tipo de cambio definido por el banco emisor de la tarjeta de cr&eacute;dito o d&eacute;bito. Los bancos de los que tenemos conocimiento que s&iacute; est&aacute;n realizando cobros en moneda local (PEN) son: Banco Financiero, Citibank y Banco Falabella (s&oacute;lo tarjetas Visa). Asimismo, es posible que en el caso de tarjetas de d&eacute;bito o cr&eacute;dito que no sean bimoneda, el banco aplique a la transacci&oacute;n un tipo de cambio que altere el precio mostrado en los recibos que emite Aprendiendo.la.</p>
        <p>&nbsp;</p>
        <p>El cliente autoriza a la empresa a debitar de forma autom&aacute;tica su tarjeta de cr&eacute;dito o d&eacute;bito al adquirir el "Plan Premium" y/o "Suscripci&oacute;n" cada 30 d&iacute;as hasta que el cliente decida cancelarlo. En su defecto, si el plan contara con renovaciones mayores a 30 d&iacute;as el cliente autoriza a la empresa a debitar de forma autom&aacute;tica su tarjeta de cr&eacute;dito o d&eacute;bito en el plazo que corresponda.</p>
        <p>En caso el usuario congele su "Plan Premium" y/o "Suscripci&oacute;n" el cobro se realizar&aacute; de forma autom&aacute;tica en la fecha que corresponda. Los d&iacute;as en los que la cuenta se mantenga en estatus de "Congelada" se guardar&aacute;n y se asignar&aacute;n como adicionales al t&eacute;rmino del periodo en el que el usuario mantenga el acceso en la plataforma por el &uacute;ltimo pago realizado.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>11 PROPIEDAD INTELECTUAL E INDUSTRIAL</strong></strong></p>
        <p>Los derechos de propiedad intelectual del sitio Web son titularidad de Aprendiendo.la Inc. a quien corresponde el ejercicio exclusivo de los derechos de explotaci&oacute;n que incluyen la reproducci&oacute;n, la distribuci&oacute;n, la comunicaci&oacute;n p&uacute;blica y la transformaci&oacute;n. A t&iacute;tulo enunciativo estos derechos incluyen el software, el c&oacute;digo fuente, el dise&ntilde;o gr&aacute;fico, la estructura de navegaci&oacute;n, las bases de datos, los textos, las fotograf&iacute;as e im&aacute;genes, y en general todos los contenidos y elementos que contiene y que hayan sido subidos al sitio Web por Aprendiendo.la. Del mismo modo, las marcas, nombres comerciales o signos distintivos son titularidad exclusiva de Aprendiendo.la o en su caso, de terceros, salvo que se especifique lo contrario.</p>
        <p>Aprendiendo.la Inc. es titular de los derechos de propiedad intelectual que hacen referencia a sus productos y servicios, respecto a las citas de terceros.</p>
        <p>Queda expresamente prohibida la cesi&oacute;n de los derechos de propiedad intelectual sobre el sitio Web. En concreto, est&aacute; prohibida la reproducci&oacute;n, transformaci&oacute;n, distribuci&oacute;n, comunicaci&oacute;n p&uacute;blica, puesta a disposici&oacute;n, extracci&oacute;n, reutilizaci&oacute;n, o la utilizaci&oacute;n de cualquier naturaleza, por cualquier medio o procedimiento, de cualquier de ellos, salvo en los casos en que sea autorizado por el titular de los correspondientes derechos.</p>
        <p>La utilizaci&oacute;n no autorizada de la informaci&oacute;n contenida en el sitio Web, su reventa, as&iacute; como la lesi&oacute;n de los derechos de Propiedad Intelectual de Aprendiendo.la dar&aacute; lugar a las responsabilidades legalmente establecidas.</p>
        <p>Los Usuarios tendr&aacute;n que respetar todos los derechos de propiedad intelectual e industrial sobre el sitio Web. Sin embargo, los Usuarios podr&aacute;n visualizar y obtener una copia privada temporal de los contenidos para su uso exclusivo personal y privado en sus sistemas inform&aacute;ticos, siempre que no sea con el fin de desarrollar actividades de car&aacute;cter comercial o profesional, as&iacute; como su distribuci&oacute;n, modificaci&oacute;n, alteraci&oacute;n o descompilaci&oacute;n. La infracci&oacute;n de cualquier de los derechos citados puede constituir una vulneraci&oacute;n de las presentes condiciones, as&iacute; como un delito contenido establecido en la legislaci&oacute;n peruana vigente.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>12 PROTECCI&Oacute;N DE DATOS PERSONALES</strong></strong></p>
        <p>Aprendiendo.la garantiza la seguridad y confidencialidad en el tratamiento de los datos de car&aacute;cter personal facilitados por sus Usuarios, de conformidad con la legislaci&oacute;n peruana. En ning&uacute;n caso Aprendiendo.la proporciona informaci&oacute;n que identifique a sus Usuarios, sin previa autorizaci&oacute;n de &eacute;stos, salvo para el estricto y &uacute;nico fin de brindar el mejor Servicio.</p>
        <p>El Usuario otorga autorizaci&oacute;n expresa a Aprendiendo.la para realizar tratamiento y hacer uso de la informaci&oacute;n personal que &eacute;ste proporcione a Aprendiendo.la cuando acceden al sitio Web, participar en eventos y promociones, env&iacute;ar consultas o comunicar incidencias, y en general cualquier interacci&oacute;n web, adem&aacute;s de la informaci&oacute;n que se derive del uso de Servicios que pudiera tener contratados con Aprendiendo.la y de cualquier informaci&oacute;n p&uacute;blica o que pudiera recoger a trav&eacute;s de fuentes de acceso p&uacute;blico, incluyendo aquellos a los que Aprendiendo.la tenga acceso como consecuencia de su navegaci&oacute;n por este sitio Web (en adelante, la "Informaci&oacute;n") para las finalidades de env&iacute;o de comunicaciones comerciales, comercializaci&oacute;n de productos y servicios, ofertas comerciales que se , entre otros. La navegaci&oacute;n en el sitio Web, participaci&oacute;n en eventos y promociones y cualquier otra interacci&oacute;n web implica el consentimiento expreso del Usuario para la cesi&oacute;n de sus datos personales a Aprendiendo.la. El Usuario reconoce y acepta que Aprendiendo.la podr&aacute; ceder sus datos personales a cualquier tercero, siempre que sea necesaria su participaci&oacute;n para cumplir con la prestaci&oacute;n de los Servicios.</p>
        <p>La pol&iacute;tica de privacidad de Aprendiendo.la le asegura, en todo caso, el ejercicio de los derechos de acceso, rectificaci&oacute;n, cancelaci&oacute;n, informaci&oacute;n de valoraciones y oposici&oacute;n, en los t&eacute;rminos establecidos en la legislaci&oacute;n vigente.</p>
        <p>Para mayor informaci&oacute;n puede visitar nuestra Pol&iacute;tica de Privacidad dando click aqu&iacute; (Link que lleve a la pol&iacute;tica de privacidad en la web de Aprendiendo.la).</p>
        <p>&nbsp;</p>
        <p><strong><strong>13 COOKIES</strong></strong></p>
        <p>Toda la informaci&oacute;n sobre las cookies en general y sobre las que se utilizan en el sitio Web en particular se encuentra en nuestra Pol&iacute;tica de Cookies. (Link que lleve a la pol&iacute;tica de privacidad en la web de Aprendiendo.la)</p>
        <p>La p&aacute;gina principal del sitio Web dispone de un enlace para poder acceder al contenido de la Pol&iacute;tica de Cookies.</p>
        <p><strong><strong>&nbsp;</strong></strong></p>
        <p><strong><strong>14 JURISDICCI&Oacute;N</strong></strong></p>
        <p>Las presentes Condiciones se interpretar&aacute;n conforme a la legislaci&oacute;n local vigente sobre la materia, que se aplicar&aacute; subsidiariamente en todo lo que no se haya previsto en las mismas.</p>
        <p>Para la resoluci&oacute;n de todas las controversias o cuestiones relacionadas con el sitio Web o de las actividades en &eacute;l desarrolladas, ser&aacute; de aplicaci&oacute;n la legislaci&oacute;n peruana vigente, a la cual se someten expresamente Aprendiendo.la y los Usuarios, con renuncia expresa a cualquier otro fuero, siendo competentes para la resoluci&oacute;n de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales del pa&iacute;s correspondiente.</p>
        <p>&nbsp;</p>
        <p><strong><strong>15 REFERIDOS</strong></strong></p>
        <p>El referidor obtendr&aacute; S/20 de descuento por cada referido que llegue a comprar con el link del referidor. Este, podr&aacute; hacer uso de sus descuentos para el siguiente cobro con un m&aacute;ximo de S/80. Si en caso el referidor tiene un saldo acumulado de m&aacute;s de S/80 podr&aacute; usar el saldo restante para el subsiguiente pago. El referido obtendr&aacute; S/20 de descuento para el primer mes de cualquier plan premium. Los cupones no son acumulables ni transferibles.</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
};

export default UseConditions;
