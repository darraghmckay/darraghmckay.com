import React from 'react';
import img from '../../imgs/isomer-route.png';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';
import { Point } from 'isomer';
import DIR from 'isomer-route/src/directions';
import IsometricRoute from '../../components/IsometricRoute';
import IsomerRoutePage from './pages/IsomerRoutePage';

export default {
  title: 'isomer-route',
  subTitle: 'Isometric drawing tool',
  path: 'isomer-route',
  createdAt: '2020-04-28',
  img,
  category: WEB_DEVELOPMENT,
  color: '#5acbcb',
  sourceCode: 'https://github.com/darraghmckay/isomer-route',
  cover: () => (
    <IsometricRoute
      scale={3}
      height={300}
      width={800}
      drawRoute={route => {
        route
          .setGridSize(6)
          .updateOrigin(0, 2, 0)
          .addColumn(3, DIR.UP, block => block.addEndExtrusion())
          .setOrigin(Point(1, 2, 0))
          .addTrack(5, DIR.X)
          .addTrack(6, DIR.Y)
          .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
          .draw();
      }}
    />
  ),
  body: IsomerRoutePage,
};
