import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./reduxStore/store";
import AppPageMainLayout from "./layout";
import { BaseCSS } from "styled-bootstrap-grid";

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
    <Provider store={store}>
        <BaseCSS />
        <AppPageMainLayout />
    </Provider>
);