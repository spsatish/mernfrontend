import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Dashboard';
import Authentication from './Authentication';
import Testenvironment from './Testenvironment';
import Mcq from './Mcq';
import Submission from './Submission';
import Scores from './Scores';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Authentication></Authentication>
  },
  {
    path : '/dashboard',
    element : <Dashboard></Dashboard>
  },
  {
    path : '/testenvironment',
    element : <Testenvironment></Testenvironment>
  },
  {
    path : '/mcq',
    element : <Mcq></Mcq>
  },
  {
    path : '/submission',
    element : <Submission></Submission>
  },
  {
    path : '/scores',
    element : <Scores></Scores>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
