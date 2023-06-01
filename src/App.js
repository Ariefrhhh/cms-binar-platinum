import './assets/CSS/App.css';

import { AuthProvider } from './config';



function App(props) {
  return (
   
      <AuthProvider {...props}/>
  
  );
}

export default App;
