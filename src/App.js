import Dropzone from 'react-dropzone'
import { Button } from 'reactstrap'
import { useState } from 'react'
import axios from 'axios'

import { handleExcelDrop } from './utils/excel'
import logo from './logo.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  const onClickUpload = async () => {
    const uploadDataUrl = `${process.env.REACT_APP_API_URL}/data/upload`
    console.log("🚀 ~ file: App.js ~ line 1 ~ onClickUpload ~ data", data)
    const response = await axios.post(uploadDataUrl, data)
    console.log("🚀 ~ file: App.js ~ line 15 ~ onClickUpload ~ response", response)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Dropzone onDrop={file => handleExcelDrop(file, setData)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <Button color="primary" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Select files</p>
              </Button>
            </section>
          )}
        </Dropzone>

        <Button onClick={onClickUpload} color="primary"> Upload </Button>
      </header>
    </div>
  );
}

export default App;
