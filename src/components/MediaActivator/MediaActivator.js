import React from 'react';

import * as S from './MediaActivator.styles';

const MediaActivator = ({
    text = "Let's play some music",
    onClick = () => { },
}) => {
    return (
        <S.Container tabIndex="0">
            <S.ButtonContainer>
                <S.Button onClick={onClick}>
                    {text}
                </S.Button>
            </S.ButtonContainer>
        </S.Container>
    )
}

export default MediaActivator
