import React from 'react';
import Router from './router/router'
import {BrowserRouter} from "react-router-dom";
import {NavBar} from "./components/NavBar";

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div className="flex h-screen">
              <div className="bg-gray-800 w-64 min-h-screen p-4">
                  <NavBar />
              </div>

              <div className="flex-1 bg-gray-100 p-6">
                  <Router />
              </div>
          </div>
      </BrowserRouter>
  );
};

export default App;
