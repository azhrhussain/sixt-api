import React, { Suspense } from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import LazyComponents from "./LazyComponents";
import RouteMap from "./RouteMap";

const App: React.FC = () => {
  return (
   <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        {RouteMap.map((item) => {
              const { path, component, ...otherProps } = item;
              const RouteComponent = LazyComponents[component];
              return (
                <Route
                  key={path}
                  element={<RouteComponent />}
                  path={path}
                  {...otherProps} />
              );
            })}
          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
