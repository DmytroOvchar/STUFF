import AppRoutes from "../Routes/Routes";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Sidebar } from "../Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";
import { UserForma } from "../User/UserForma";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGategories());
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="app">
      <Header />
      <UserForma />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
