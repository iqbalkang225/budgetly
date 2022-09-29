import styles from './Header.module.css'
import '../../variables.css'

const Header = () => {
    return (
        <header className='section-center'>
            <h2>Good Morning!</h2>
            <div className = {styles.card}>
                <div className = {styles['card-group']}>
                    <p className = {styles.title}>Balance</p>
                    <p  className = {`${styles.balance} ${styles.value}`}> $10,000 </p>
                </div>

                <div className = {styles['card-group-box']}>
                    <div className = {styles['card-group']}>
                        <p className = {styles.title}>Income</p>
                        <p  className = {` ${styles.value}`}> $10,000 </p>
                    </div>

                    <div className = {styles['card-group']}>
                        <p className = {styles.title}>Expense</p>
                        <p  className = {`${styles.value}`}> $10,000 </p>
                    </div>

                    <div className = {styles['card-group']}>
                        <p className = {styles.title}>Investment</p>
                        <p  className = {` ${styles.value}`}> $10,000 </p>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header