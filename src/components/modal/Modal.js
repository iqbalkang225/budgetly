import styles from './Modal.module.css'

const Modal = (props) => {

    return <div className = {styles.modal}> {props.children} </div>
    
}

const Backdrop = (props) => {
    return <div 
                className = {styles.backdrop}
                onClick = {props.onClick}
                ></div>
}

export {Modal, Backdrop};