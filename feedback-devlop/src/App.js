import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackForm from './components/FeedbackForm'
import { FeedbackProvider } from './context/FeedbackContext'
import Login from "./pages/Login"
import Filters from "./components/Filters"
import { Pagination } from '@mui/material';
import Card from './components/shared/Card'
function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <Filters />
                  <FeedbackList />
                  <Card>
                  <Pagination  count={15} defaultPage={2} boundaryCount={2} />
                  </Card>
                </>
              }
            ></Route>

            <Route exact path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App
