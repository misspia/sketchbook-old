import React, { useEffect, useRef, useMemo } from 'react'
import { withRouter } from 'react-router-dom';
import Header from './header'

import * as S from './entry.styles'

import Sketches from '../../sketches/sketches'
import MediaActivator from './mediaActivator/mediaActivator';

// class EntryOld extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       SketchComponent: null,
//       activateMediaRequired: false,
//     }
//   }
//   componentWillMount() {
//     this.setNewSketch();
//   }
//   componentWillUnmount() {
//     this.state.sketch.triggerUnmount();
//   }
//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.match) return; // 404 handler

//     const currentIndex = parseInt(this.props.match.params.index);
//     const nextIndex = parseInt(nextProps.match.params.index);

//     if (currentIndex != nextIndex) {
//       this.clearSketchContext();
//       this.setNewSketch(nextIndex);
//     }
//   }
//   clearSketchContext() {
//     if (this.state.sketch) this.state.sketch.clear();
//     this.setState({
//       title: '',
//       SketchComponent: null
//     })
//   }
//   setNewSketch() {
//     const sketchIndex = this.props.match.params.index;
//     const Sketch = Sketches[sketchIndex];
//     console.debug(Sketch)
//     this.setState({
//       title: Sketch.title,
//       instructions: Sketch.instructions,
//       SketchComponent: Sketch.component,
//     }, () => {
//       // if (this.state.sketch.audioElement) {
//       //   this.setState(() => ({
//       //     activateMediaRequired: true,
//       //   }));
//       // } else {
//       //   this.state.sketch.render()
//       // }
//     })
//   }
//   render() {
//     const { SketchComponent } = this.state;
//     return (
//       <Container ref={ref => this.container = ref}>
//         {/* {
//           this.state.activateMediaRequired &&
//           <MediaActivator
//             onClick={e => {
//               this.setState(() => ({
//                 activateMediaRequired: false,
//               }), () => {
//                 this.state.sketch.render();
//               })
//             }}
//           />
//         } */}
//         <Header
//           title={this.state.title}
//           instructions={this.state.instructions}
//         />
//         <SketchComponent />
//       </Container>
//     );
//   }
// }


const Entry = ({
  match,
}) => {
  const sketchIndex = match.params.index;
  const { title, instructions } = Sketches[sketchIndex]

  const SketchComponent = useMemo(() => (
    Sketches[sketchIndex].component
  ), [sketchIndex]);

  const test = useMemo(() => {
    return test
  }, [])
  return (
    <S.Container>
      {/* {
        this.state.activateMediaRequired &&
        <MediaActivator
          onClick={e => {
            this.setState(() => ({
              activateMediaRequired: false,
            }), () => {
              this.state.sketch.render();
            })
          }}
        />
      } */}
      <Header
        title={title}
        instructions={instructions}
      />
      <SketchComponent />
    </S.Container>
  );
}

export default withRouter(Entry);
