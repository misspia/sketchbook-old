import React from 'react';

import * as S from './mediaActivator.styles';

export default class MediaActivator extends React.Component {
    static defaultProps = {
        text: 'Press to play music',
        onClick: () => {},
    }
    render() {
        return (
            <S.Container>
                <S.Button onClick={e => this.props.onClick(e)}>
                    {this.props.text}
                </S.Button>
            </S.Container>
        )
    }
}