import React, {useState} from 'react'
import {
    FormControl,
    Grid
} from '@material-ui/core'

const useImageForm = ({placeholder, name, label, medida}) => {
    const [value, setValue] = useState('');
    const [src, setSrc] = useState(value);
    const setImage = async (e) => {
        e.persist();
        
        if (!e.target.files || e.target.files.length === 0) {
            
            return
        }
        setValue(e.target.files[0])
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setSrc(objectUrl);
         /*
         const reader =  new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                console.log("useImageFieldForm -> reader", reader)
                setValue(reader.result)
            }
        }
        await reader.readAsDataURL(e.target.files[0]);
         */
    }
    const input =
    <FormControl>
         
        <Grid xs={12}>
        <div htmlFor={`nf-${name}`}>
            {label}
        </div>
        </Grid>
        <img
            src={src || value}
            block
            className="showImageInput mb-2"
            style={{maxWidth: '300px', margin: 'auto'}}
        />
        
        <input  
            onChange={e => {
            setImage(e)
            }}
            id={`id${name}`}
            name={`${name}`}
            type='file'
            placeholder={placeholder}
        />
        
    </FormControl>
        
    return [value, input, setValue];
}

export default useImageForm