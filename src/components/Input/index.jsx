import { InputContainer } from "./styles"

export default function Input({value, onChange}) {
    return (
        <InputContainer>
           <input type="text" value={value} onChange={onChange}/> 
        </InputContainer>
    )
}