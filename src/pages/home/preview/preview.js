import React from 'react'
import Link from 'next/link'
import * as S from './preview.styles'
import Icon from '../../../components/icon';
import { Icons, Colors } from '../../../themes';

export default function Preview({
  to = '',
  title = '',
  image = '',
  isAudio = false,
  onLoad = () => { },

}) {
  return (
    <S.Container>
      {/* <S.Image 
          src={image} 
          onLoad={onLoad}
          width="auto"
          height="100%"
        /> */}
      <Link href={to}>
        <a>
          <S.HiddenContainer>

          </S.HiddenContainer>
          {
            isAudio &&
            <S.IconWrapper>
              <Icon
                size='1.5em'
                color={Colors.grey}
                name={Icons.audio} />
            </S.IconWrapper>
          }
        </a>
      </Link>

    </S.Container>
  );
}
