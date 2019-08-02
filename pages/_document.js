/* eslint-disable max-len */
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { withRouter } from "next/router";
import { ServerStyleSheet } from "styled-components";
import { loadHotjar } from "utils/loaders";
import favicon from "../static/images/favicon.ico";

withRouter(Main);

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [...initialProps.styles, ...sheet.getStyleElement()]
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const script = `window.ENV = '${process.env.ENV || "dev"}';
    window.REACT_APP_MIXPANEL_ID = '${process.env.REACT_APP_MIXPANEL_ID}';
    window.REACT_APP_FACEBOOK_PIXEL = '${process.env.REACT_APP_FACEBOOK_PIXEL}';
    window.GOOGLE_OPTIMIZE = '${process.env.GOOGLE_OPTIMIZE}';
    window.GOOGLE_ADS_KEY = '${process.env.GOOGLE_ADS_KEY}';
    window.ONE_SIGNAL_APP_ID = '${process.env.ONE_SIGNAL_APP_ID}';
    `;
    return (
      <html lang="es">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css"
            integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j"
            crossOrigin="anonymous"
          />
          <script dangerouslySetInnerHTML={{ __html: script }} />
          <script
            src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
            async=""
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              var OneSignal = window.OneSignal || [];
              OneSignal.push(["init", {
                appId: ONE_SIGNAL_APP_ID,
                autoRegister: false,
                notifyButton: {
                  enable: false
                },
                welcomeNotification: {
                  "title": "¡Bienvenido!",
                  "message": "¡Gracias por suscribirte!"
                },
                promptOptions: {
                  actionMessage: "¿Te gustaría recibir notificaciones de promociones y descuentos?.",
                  acceptButtonText: "Claro que sí",
                  cancelButtonText: "Por ahora no"
                }
              }]);
              OneSignal.push(function() {
                OneSignal.showHttpPrompt();
              });
              `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
                  0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                  for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
                  mixpanel.init(REACT_APP_MIXPANEL_ID);
              `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', REACT_APP_FACEBOOK_PIXEL);
                fbq('track', 'PageView');
              ${loadHotjar()}
              `
            }}
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GOOGLE_ADS_KEY"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', GOOGLE_ADS_KEY);
              `
            }}
          />
          <script
            type="text/javascript"
            src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"
          />
          <script src="https://js.stripe.com/v3/" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <meta
            name="title"
            content="Aprendiendo.la | Clases online para los cursos más difíciles de tu carrera"
          />
          <meta
            name="description"
            content="Estudia donde quieras, cuando quieras y mira las clases cuantas veces quieras"
          />
          <meta name="language" content="Spanish" />
          <meta
            property="og:image"
            content="https://s3.amazonaws.com/pe.aprendiendo.la/fbshare.png"
          />
          <meta
            property="og:description"
            content="Estudia donde quieras, cuando quieras y mira las clases cuantas veces quieras"
          />
          <meta
            property="og:site_name"
            content="Aprendiendo.la | Clases online para los cursos más difíciles de tu carrera"
          />
          <meta
            property="og:title"
            content="Aprendiendo.la | Clases online para los cursos más difíciles de tu carrera"
          />
          <meta property="og:url" content="https://www.aprendiendo.la" />
          <meta property="og:type" content="website" />
          <link
            href="//fonts.googleapis.com/css?family=Lato:400,600,700,900"
            rel="stylesheet"
          />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/paymentfont/1.2.5/css/paymentfont.css"
          />
          <link rel="icon" href={favicon} />
          <style>
            {`* {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                min-height: 0;
                min-width: 0;
                font-family: Lato, sans-serif !important;
                text-rendering: optimizeLegibility;
                -moz-osx-font-smoothing: grayscale;
                font-smooth: antialiased;
                -webkit-font-smoothing: antialiased;
                outline: none;
              }
              html, body {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                min-height: 0;
                min-width: 0;
                width: 100%;
                height: auto;
                color: #363636;
                font-size: 16px;
                line-height: 1.5;
                text-align: left;
              }

              .showWithDelay{
                opacity: 1 !important;
                transition: all 1.5s;
              }

              .hideWithDelay{
                opacity: 0 !important;
                transition: all .2s;
              }

              .switch span {
                height: 18px !important;
                width:18px !important;
                cursor: pointer !important;
              }
              .switch-lessons span {
                cursor: pointer !important;
              }
              .ReactModal__Overlay--after-open{
                background: rgba(62,62,62,.9) !important;
              }
              .ReactModal__Content {
                @media (min-width: 62em) {
                  height: 560px !important;
                  width: 900px !important;
                }
              }`}
          </style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
