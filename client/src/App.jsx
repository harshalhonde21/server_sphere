import React from 'react'
import Todo from './Components/Todo'
import Event from './Components/Event'

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Todo />


      <Toaster position="top-center" />
    </div>
  )
}

export default App
