import React from 'react'
import styled from "styled-components";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import facebookPixel from 'utils/facebook';

const Container = styled.div`
    border: 1px solid #dadada;
    max-width: 367px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Link = styled.div`
    color: #626262;
    padding: 0px 10px;
`;

const Button = styled.button`
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-weight: 900;
    background: #1178f2;
    font-size: 15px;
    cursor: pointer;
`;


export default ({ link }) => {
  return (
    <Container>
        <Link>
            {link}
        </Link>
        <div>
            <CopyToClipboard text={link}
                onCopy={() => {
                    facebookPixel.referralCopiedLink({
                        status: true
                      });
                    Swal.fire({
                        title: 'Copiado!',
                        type: 'success',
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                      })}
                }
            >
                <Button>
                    Copiar
                </Button>
            </CopyToClipboard>
        </div>
    </Container>
  )
}
