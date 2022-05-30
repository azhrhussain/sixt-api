import React from 'react';
const LazyComponents:any = {};
const Components = [
  'Offers',
  'NotFound'
];

Components.forEach(name => {
	LazyComponents[name] = React.lazy(() => import(`./../modules/${name}`));
});

export default LazyComponents;
