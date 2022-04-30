import styled from 'styled-components';
import { Colors } from '@themes';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100%;

    z-index: 999;

    background-color: ${Colors.black};
`;

/**
 * https://codepen.io/jhancock532/pen/GRZrLwY?editors=1100
 */

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 0;
`

const HOVER_DURATION = '1s';

export const Button = styled.div`
    font-size: 1.4em;
    line-height: 1em;
    color: ${Colors.cream};

    transition: all ${HOVER_DURATION} cubic-bezier(0.32, 0, 0.67, 0);

    cursor: pointer;

    &::after,
    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        transition: clip-path ${HOVER_DURATION} cubic-bezier(0.65, 0, 0.35, 1);
    }

    &::before {
        background-color: ${Colors.cream};
        clip-path: circle(0% at 50% calc(50%));
    }

    &::after {
        background-color: ${Colors.black};
        clip-path: polygon(
            45% 0%,
            55% 0%,
            55% 0%,
            45% 0%,
            45% 100%,
            55% 100%,
            55% 100%,
            45% 100%
        );
    }

    &:hover, &:focus {
     color: ${Colors.black};
     letter-spacing: 3px;
     transition: all ${HOVER_DURATION} cubic-bezier(0.33, 1, 0.68, 1);
     &::before {
         clip-path: circle(100% at 50% 50%);
     }
     &::after {
         clip-path: polygon( 
            45% 10%,
            55% 10%,
            55% 35%,
            45% 35%,
            45% 90%,
            55% 90%,
            55% 65%,
            45% 65%
        );
     }
 }
`;
