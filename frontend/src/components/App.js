import React from 'react'
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';


export default class App extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
    }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
