import { useContext } from 'react'
import TransactionContext from '../../store/transaction-context'
import styles from './Button.module.css'
// import '../../variables.css'

const Button = (props) => {
    
    return <button 
                className = {`${styles.button} ${props.className}`}
                onClick = {props.onClick}
                > {props.children} </button>
}

export default Button