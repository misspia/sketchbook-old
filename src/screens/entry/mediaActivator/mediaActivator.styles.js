import styled from 'styled-components';
import { Colors } from '../../../themes/themes';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;


    background-color: rgba(0, 0, 0, 1.0);
`;

export const Button = styled.div`
    font-size: 1.4em;
    padding: 0.2em 0.6em;
    color: ${Colors.cream};
    border: solid 0.1em ${Colors.cream};
    border-radius: 0.1em;

    transition: all 0.3s;
    cursor: pointer;
    
    &:hover {
        background-color: ${Colors.cream};
        color: ${Colors.black};
    }
`;