import React from 'react';
import * as S from './Loader.styles';

export default function Loader({
  progress = 0, // 0 - 100
}) {
  return (
    <S.Wrapper>
      <S.Text>
        Loading...
      </S.Text>
      <S.Bar width={progress} />
    </S.Wrapper>
  );
}
