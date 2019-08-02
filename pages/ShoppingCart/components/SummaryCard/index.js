import React from 'react';
import visaLogo from 'assets/images/visa-logo.png';
import payuLogo from 'assets/images/payu-logo.png';
import masterLogo from 'assets/images/master-logo.png';
import yapeLogo from 'assets/images/yape-logo.png';
import whatsappLogo from 'assets/images/icons/whatsapp@2x.png';
import service from 'services';
import { CONTACT_NUMBER } from 'constants';
import {
  SummaryCardContainer,
  PayingContainer,
  PriceContainer,
  SummaryLabel,
  Button,
  InfoContainer,
  PayMethodContainer,
  PayMethodBrandsContainer,
  PayMethodBrand,
  DiscountContainer,
  DiscountCallToAction,
  DiscountInput,
  WhatsAppContainer,
  WhatsAppNumberContainer
} from './styles';

const SummaryCard = props => {
  const { totalPrice, previousPrice, goToCheckout } = props;

  return (
    <div>
      <SummaryCardContainer>
        <PayingContainer>
          <PriceContainer>
            <SummaryLabel>
              Total a pagar
            </SummaryLabel>
            <SummaryLabel paddingTop="11px" paddingBottom="8px" fontSize="30px" color="#0fa3f4">
              {`${service.getCountry().currencySymbol} ${totalPrice.toFixed(2) || '0.00'}`}
            </SummaryLabel>
            {previousPrice && (
              <SummaryLabel fontWeight="normal" fontSize="12px" color="#686868">
                {`Normal ${service.getCountry().currencySymbol} ${previousPrice.toFixed(2) || '0.00'}`}
              </SummaryLabel>
            )}
          </PriceContainer>
          <Button style={{ fontFamily: 'Lato', fontWeight: 'bold' }} onClick={() => goToCheckout()}>
            PAGAR
          </Button>
        </PayingContainer>
        <InfoContainer>
          <PayMethodContainer>
            <SummaryLabel paddingBottom="17px" fontSize="12px" fontWeight="normal" color="#414042">
              Métodos de pago
            </SummaryLabel>
            <PayMethodBrandsContainer>
              <PayMethodBrand img={visaLogo} />
              <PayMethodBrand img={masterLogo} />
              <PayMethodBrand img={payuLogo} backgroundSize="18px auto" />
              <PayMethodBrand img={yapeLogo} />
            </PayMethodBrandsContainer>
          </PayMethodContainer>
          <DiscountContainer>
            <SummaryLabel fontSize="14px" fontWeight="normal" color="#686868">
              ¿Tienes un código de descuento?
            </SummaryLabel>
            <DiscountCallToAction>
              <DiscountInput placeholder="Ingrésalo" />
              <Button isDiscountBtn backgroundColor="#d1d3d4">
                Aplicar
              </Button>
            </DiscountCallToAction>
            <SummaryLabel paddingTop="5px" fontSize="11px" fontWeight="normal" color="#e74133">
              El código no es correcto
            </SummaryLabel>
          </DiscountContainer>
        </InfoContainer>
      </SummaryCardContainer>
      <WhatsAppContainer>
        <SummaryLabel fontWeight="normal" fontSize="14px" color="#414042">
          ¿Necesitas ayuda? Escríbenos
        </SummaryLabel>
        <WhatsAppNumberContainer>
          <PayMethodBrand
            img={whatsappLogo}
            backgroundSize="20px auto"
            width="20px"
            height="20px"
            marginRight="5px"
          />
          <SummaryLabel fontSize="14px" color="#414042">
            <a href={`https://wa.me/51${CONTACT_NUMBER}`} target="blank">{CONTACT_NUMBER}</a>
          </SummaryLabel>
        </WhatsAppNumberContainer>
      </WhatsAppContainer>
    </div>
  );
};

export default SummaryCard;
