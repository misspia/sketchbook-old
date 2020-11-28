import React from 'react';
import * as S from './loader.styles';

export default function Loader({
    progress = 0, // 0 - 100
}) {
    return (
        <S.Wrapper>
            <S.Text>
                Loading...
            </S.Text>
            <S.Progress>
                <S.Bar width={progress}/>
            </S.Progress>
        </S.Wrapper>
    );
}