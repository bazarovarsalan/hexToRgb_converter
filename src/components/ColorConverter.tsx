import {FC, useState} from 'react'
import '../App.css'
interface IRgb  {
  rgb: {r: number,
        g: number,
        b: number
      },
  result:string
  currentColor:string
}



const ColorConverter: FC = () => {
    const [hexColor, setHexColor] = useState <string>("#");
    const [rgbColor, setRgbColor] = useState<IRgb>({rgb:{r:0, g:0, b:0}, result: "",currentColor: "34,54,61"});
    
    const inputHandler = (e:any) => {
      const inputVal = e.target.value.toString()
        setHexColor(inputVal);
        if (inputVal.length === 7) {
          checkResult(inputVal)
        }
     
        
    }


    function checkResult(hex:string) {
      const res: IRgb["rgb"] = hexToRgb(hex)
      if (hex.charAt(0) !== "#" || (res.r === 0 && res.g === 0 && res.b === 0)) {
        setHexColor("#Привет");
        setRgbColor(prev => ({...prev, result:"Ошибка!"}));
      } else {
        setRgbColor(prev => ({...prev,rgb: res, currentColor:`${res.r},${res.g},${res.b}`,result:`rgb(${res.r},${res.g},${res.b})`}))
      }

        
    }


    function hexToRgb(hex:string): IRgb["rgb"] {
        const bigint = parseInt(hex.slice(1), 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255
        }
    }

  
  
  return (
     <div className='App' style={{backgroundColor: `rgb(${rgbColor.currentColor})`}}> 
      <div className="ColorConverter">
          <input 
          className='inputHexColor' 
          onChange={inputHandler} 
          type="text"

          value={hexColor} 
          maxLength={7}
          placeholder='enter the color value in HEX format'
          /> 
          <div className="rgbDisplay"
          style={{borderColor: `rgb(${rgbColor.currentColor})`}}
          >{rgbColor.result}</div>
      </div>
    </div>
  )
}

export default ColorConverter
