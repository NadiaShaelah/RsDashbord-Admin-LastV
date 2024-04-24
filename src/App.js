import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import OrderDetails from "./components/Main/Orders/OrderDetails";
import ReservationDetails from "./components/Main/Reservations/ReservationDetails";
import QuoteDetails from "./components/Main/Quotes/QuoteDetails"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path='/order-details' element={<OrderDetails/>} />
                <Route path='/reserv-details' element={<ReservationDetails/>} />
                <Route path='/quote-details' element={<QuoteDetails/>} />
            </Routes>
        </div>
    );
}

export default App;
