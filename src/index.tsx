import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CellModalProvider } from "./context/CellModalContext";
import { AuthProvider } from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  * {
    /* font-family: "Roboto", sans-serif !important; */
    margin: 0;
    padding: 0;
  }

	.ant-message{
		z-index: 9999999;
	}
`;
console.log('hello world!')
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<CellModalProvider>
				<AuthProvider>
					<GlobalStyle />
					<App />
				</AuthProvider>
			</CellModalProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
