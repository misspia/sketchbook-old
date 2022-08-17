import React from 'react';
import styled from 'styled-components';

const Colors = {
  cream: "#eeeeee",
  grey: '#6C7A89',
}

export const Wrapper = styled.div`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.cream};
`;

export const Text = styled.div`
    color: ${Colors.grey};
    margin-bottom: 1.5em;
    letter-spacing: 2px;
`;

export const Bar = styled.div`
    height: 1px;
    width: ${props => props.width}%;
    background-color: ${Colors.grey};
    transition: width 0.3s;
`;


export const Loader = ({
  progress = 0, // 0 - 100
}) => {
  return (
    <Wrapper>
      <Text>
        Loading...
      </Text>
      <Bar width={progress} />
    </Wrapper>
  );
}
