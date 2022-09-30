import styles from './Header.module.css'
import '../../variables.css'
import { useContext } from 'react'
import TransactionContext from '../../store/transaction-context';

const Header = () => {

    const appContext = useContext(TransactionContext);

    const calculate = (transactionType) => appContext.transactions
                                            .filter(transaction => transaction.type === transactionType)
                                            .reduce((acc,curr) => acc + curr.price ,0)

    const balance = (calculate('income') - calculate('expense')).toLocaleString()
    const incomeTotal = calculate('income').toLocaleString()
    const expensesTotal = calculate('expense').toLocaleString()
    const investmentsTotal = calculate('investment').toLocaleString()

    const classes = `${styles.balance} ${styles.value} ${parseInt(balance) < 0 && styles.negative}`
    
    const timeOfTheDay = () => {
        const time = new Date().getHours()

        if (time < 12) return'Good Morning';
        else if (time >= 12 && time <= 17) return'Good Afternoon';
        else if (time >= 17 && time <= 24) return 'Good Evening';
    }


    return (
        <header className='section-center'>
            <h2> {timeOfTheDay()}! </h2>
            <div className = {styles.card}>
                <div className = {styles['card-group']}>
                    <p className = {styles.title}>Balance</p>
                    <p  className = {classes}> ${balance} </p>
                </div>

                <div className = {styles['card-group-box']}>
                    <div className = {styles['card-group']}>
                        <p className = {styles.title}>Income</p>
                        <p  className = {` ${styles.value}`}> ${incomeTotal} </p>
                    </div>

                    <div className = {styles['card-group']}>
                        <p className = {styles.title}>Expense</p>
                        <p  className = {`${styles.value}`}> ${expensesTotal} </p>
                    </div>

                    <div className = {styles['card-group']}>
                        <p className = {styles.title}>Investment</p>
                        <p  className = {` ${styles.value}`}> ${investmentsTotal}</p>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header