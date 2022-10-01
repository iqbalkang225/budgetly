import styles from './Header.module.css'
import '../../variables.css'
import { useContext, useState } from 'react'
import TransactionContext from '../../store/transaction-context';
import { BiChevronDown } from 'react-icons/bi';


const Header = () => {

    const [isShown, setIsShown] = useState(false)

    const appContext = useContext(TransactionContext);

    const calculate = (transactionType) => appContext.transactions
                                            .filter(transaction => transaction.type === transactionType)
                                            .reduce((acc,curr) => acc + curr.price ,0)

    const btcTotal = appContext.transactions
                            .filter(transaction =>  transaction.category === 'bitcoin')
                            .reduce((acc,curr) => acc + appContext.currentBitcoinPrice * curr.amount ,0)
        
    const ethTotal = appContext.transactions
                            .filter(transaction =>  transaction.category === 'ethereum')
                            .reduce((acc,curr) => acc + appContext.currentEthereumPrice * curr.amount ,0)

    const investmentsTotal = appContext.transactions
                            .filter(transaction =>  transaction.type === 'investment')
                            .reduce((acc,curr) => acc + curr.price * curr.amount ,0)

    const balance = ((calculate('income') + btcTotal + ethTotal) - calculate('expense')).toFixed(2).toLocaleString()
    const incomeTotal = calculate('income').toLocaleString()
    const expensesTotal = calculate('expense').toLocaleString()

    let profitOrLoss =  (btcTotal + ethTotal) - investmentsTotal

    const classes = `${styles.balance} ${styles.value} ${parseInt(balance) < 0 && styles.negative}`
    const spanClassName = profitOrLoss >= 0 ? styles.profit : styles.loss
    
    const timeOfTheDay = () => {
        const time = new Date().getHours()

        if (time < 12) return'Good Morning';
        else if (time >= 12 && time <= 17) return'Good Afternoon';
        else if (time >= 17 && time <= 24) return 'Good Evening';
    }

    const togglePL = () => setIsShown(prevState => !prevState)


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
                        <p 
                            className = {styles.title}>Invested 
                            <BiChevronDown 
                                className = {styles.icon} 
                                onClick = {togglePL}
                            /> </p>
                        <p className = {` ${styles.value}`}> ${investmentsTotal.toLocaleString()}</p>
                        {
                            isShown &&
                            <p className = {styles.pl}> {profitOrLoss >= 0 ? "Profit:" : "Loss"} 
                            <span 
                                className = {spanClassName}> ${profitOrLoss.toFixed(2)}
                            </span> </p>
                        }
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header