import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateContact from "./pages/CreateContact";
import ViewContacts from "./pages/ViewContacts";
import UpdateContact from "./pages/UpdateContact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateContact />} />
        <Route path="/view" element={<ViewContacts />} />
        <Route path="/update/:id" element={<UpdateContact />} />
      </Routes>
    </Router>
  );
}

export default App;
