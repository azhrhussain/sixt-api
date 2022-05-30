
interface RouteMapItem {
  path: string,
  component: string,
}

const RouteMap:Array<RouteMapItem> = [
  { 
    path: '/', 
    component: 'Offers' 
  },
  { path: '*',
    component: 'NotFound' 
  },
];

export default RouteMap;