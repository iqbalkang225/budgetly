import styles from './Main.module.css'
import '../../variables.css';
import Button from '../button/Button';
import { GoPlus } from 'react-icons/go';
import Transactions from '../transactions/Transactions';

const Main = ( props ) => {
    
    return (
        <main className='section-center'>
            <div className = {styles['title-box']}>
                <p className = {styles.title}>Transactions List</p>
                <div className = {styles.button}>
                    <Button className = "btn-round" onClick = {props.onClick} > <GoPlus /> </Button>
                </div>
            </div>

            <Transactions />
        </main>
    )
}

export default Main