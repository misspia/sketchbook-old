import styled from 'styled-components';
import { Colors } from '../../../themes';

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

export const Button = styled.div`
    font-size: 1.4em;
    line-height: 1em;
    color: ${Colors.cream};

    transition: all 1s cubic-bezier(0.32, 0, 0.67, 0);

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
        transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
    }

    &::before {
        background-color: ${Colors.cream};
        clip-path: circle(0% at 50% calc(50%));
    }

    &::after {
        background-color: ${Colors.black};
        clip-path: polygon(
            40% 0%,
            60% 0%,
            60% 0%,
            40% 0%,
            40% 100%,
            60% 100%,
            60% 100%,
            40% 100%
        );
    }

    &:hover, &:focus {
     color: ${Colors.black};
     letter-spacing: 3px;
     transition: all 1s cubic-bezier(0.33, 1, 0.68, 1);
     &::before {
         clip-path: circle(100% at 50% 50%);
     }
     &::after {
         clip-path: polygon(
             40% 10%,
             60% 10%,
             60% 35%,
             40% 35%,
             40% 90%,
             60% 90%,
             60% 65%,
             40% 65%
         );
     }

 }
`;
