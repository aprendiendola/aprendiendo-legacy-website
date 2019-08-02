const nextRouter = require("next/router");
const routes = require("next-routes");

const base = path => `/:country${path}`;

module.exports = nextRouter.withRouter(
  routes()
    .add("Home", base("/"))
    .add("about", base("/about/:id"))
    .add("Login", base("/login"))
    .add("Register", base("/registro"))
    .add("Subscription", base("/suscripcion"))
    .add("FreeTrialSubscription", base("/pruebalo"))
    .add("Search", base("/cursos/search/:queries?"))
    .add("Courses", base("/cursos/:queries?"), "Courses")
    .add("CourseDetail", base("/cursos/:name/:id/:course?"), "CourseDetail")
    .add("PremiumCheckout", base("/premium/checkout/:id"))
    .add("FreeTrialCheckout", base("/freetrial/checkout/:id"))
    .add("Checkout", base("/checkout/:queries?/:params?"))
    .add("PackageCheckout", base("/paquetes/pagar"))
    .add("Plans", base("/planes/:id"))
    .add("IndividualClasses", base("/planes/:id/clases"))
    .add("Success", base("/exito/:queries?"))
    .add("Profile", base("/perfil"))
    .add(
      "Player",
      base(
        "/player/:uni?/:course?/:lesson?/:course_id?/:lesson_id?/:subject_id?"
      )
    )
    .add("UseConditions", base("/condiciones-de-uso"))
    .add("FAQ", base("/preguntas-frecuentes"))
    .add("PrivacyPolicy", base("/politicas-de-privacidad"))
    .add("PasswordRecovery", base("/recuperar-password"))
    .add("ResetPassword", base("/restablecer-password"))
    .add("ShoppingCart", base("/carrito"))
    .add("Presale", base("/preventa"))
    .add("FreemiumSuccess", base("/exito-freemium"))
);
