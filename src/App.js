import { Provider } from "react-redux";
import "./App.css";
import PageLayout from "./components/layout";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoogleLoginForm from "./components/login";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout />} />
            <Route path="/login" element={<GoogleLoginForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
