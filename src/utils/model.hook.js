import * as tf from '@tensorflow/tfjs'
import { useState, useEffect } from 'react'

export function useModel(url) {
    const [model, setModel] = useState(null)

    useEffect(() => {
        async function loadModel() {
            try {
                const model = await tf.loadLayersModel(url)
                setModel(model)
                console.log("Load model success")
            }
            catch (err) {
                console.log(err)
                setModel(null)
            }
        }

        if(url && !model) {
            loadModel()
        }
    }, [model, url])

    return model
}