import {Button as ButtonMui} from '@mui/material'


const Button = ({ type = 'submit', ...props }) => (
    <ButtonMui
        variant = 'outlined'
        size='large'
        type={type}
        {...props}
    />
)

export default Button
