import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx'
import Groups from './components/Groups.jsx'
import {Provider} from 'react-redux'
import splitlyStore from './store/index.js'
import CreateGroups from './components/CreateGroups.jsx'
import AddFriend from './components/AddFriend.jsx'
import ExpenseShow from './components/ExpenseShow.jsx'
import AddExpense from './components/AddExpense.jsx'
import CashPayment from './components/CashPayment.jsx'
import AllExpenses from './components/AllExpenses.jsx'
import Login from './components/Login.jsx'
import Signup from './components/SignUp.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/", 
    element: <ProtectedRoute />, 
    children: [
      { path: "/", element: <App />, children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "groups", element: <Groups /> },
        { path: "friends", element: <Groups /> },
        { path: "create/groups", element: <CreateGroups /> },
        { path: "create/friends", element: <AddFriend /> },
        { path: "groups/:id", element: <ExpenseShow /> },
        { path: "friends/:id", element: <ExpenseShow /> },
        { path: "expense", element: <ExpenseShow /> },
        { path: "add-expense/:id", element: <AddExpense /> },
        { path: "cash-payment/:id", element: <CashPayment /> },
        { path: "all-expenses", element: <AllExpenses /> },
        { path: "friends/edit/:id", element: <AddFriend /> },
        { path: "groups/edit/:id", element: <CreateGroups /> }
      ]}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={splitlyStore}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
