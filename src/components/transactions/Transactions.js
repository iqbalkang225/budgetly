import { useContext } from 'react'
import TransactionContext from '../../store/transaction-context'
import Button from '../button/Button'
import TransactionItem from './TransactionItem'
import styles from './Transactions.module.css'

const Transactions = () => {
    const appContext = useContext(TransactionContext)
    const transactionsList = [...appContext.filteredTransactions].reverse();
    

    return (
        <article className = {styles.transactions}>
             <div className = {styles['transaction-btns']}>
                <Button 
                    className = "transaction-btn"
                    onClick = {appContext.onFilterTransactions.bind(null, "all")}
                    > All 
                </Button>

                <Button 
                    className = "transaction-btn"
                    onClick = {appContext.onFilterTransactions.bind(null, "income")}
                    > Income 
                </Button>

                <Button 
                    className = "transaction-btn"
                    onClick = {appContext.onFilterTransactions.bind(null, "expense")}
                    > Expenses 
                </Button>

                <Button className = "transaction-btn"> Investments </Button>
            </div>

            {
                transactionsList.map(transaction => (
                    <TransactionItem key = {transaction.id} {...transaction} /> 
                ))
            }

        </article>
       
    )
}

export default Transactions