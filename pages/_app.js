import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import withGA from 'next-ga';
import { PageLoader } from 'components';
import Layout from 'components/Layout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import withNProgress from 'next-nprogress';
import { theme } from 'styles';
import { store, persistor } from '../config/store';
import redirectTo from '../config/redirecTo';


const asyncGeolocateToGuestUser = async () => {
  try {
    const {
      country
    } = await axios.get(`${process.env.APRENDIENDO_PATRONUS_API}/country-detector`);
    return country;
  } catch (e) {
    return 'pe';
  }
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const country = 'pe';
    if (ctx.asPath === '/' || ctx.asPath === '/pe') {
      redirectTo(`/${country.toLowerCase()}/`, { res: ctx.res, status: 301 });
    } else if (ctx.pathname === `/${country.toLowerCase()}/cursos/search`) {
      redirectTo(`/${country.toLowerCase()}/cursos`, { res: ctx.res, status: 301 });
    }

    return {
      pageProps
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem('country_code')) {
      const country = 'pe';
      localStorage.setItem('country_code', country.toUpperCase());
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"
            />
            <title>Aprendiendo.la | Clases online para los cursos más difíciles de tu carrera</title>
          </Head>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Container>
      </ThemeProvider>
    );
  }
}

const msDelay = 1000;

export default withNProgress(msDelay)(MyApp);
