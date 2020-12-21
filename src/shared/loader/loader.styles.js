import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.div`
    color: ${Color.cream};
`;

export const Progress = styled.div`
    width: 100%;
    height: 2px;
    position: relative;
`;

export const Bar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.width}%;
    background-color: ${Colors.cream};
`;
