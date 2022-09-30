import { useContext } from 'react'
import TransactionContext from '../../store/transaction-context'
import Button from '../button/Button'
import TransactionItem from './TransactionItem'
import styles from './Transactions.module.css'

const Transactions = () => {
    const appContext = useContext(TransactionContext)

    const transactionsList = [...appContext.transactions].reverse();

    const filteredList = transactionsList.filter(transaction => {
        if(appContext.selectedType === 'all') return transaction
        return transaction.type === appContext.selectedType
    })

    const btns = appContext.transactionTypes.reduce((acc, curr) => {
        return [...acc, curr]
    }, ["all"])

    return (
        <article className = {styles.transactions}>
             <div className = {styles['transaction-btns']}>

               {
                btns.map((btn,index) => {
                    return <Button 
                                key = {index}
                                className = {`transaction-btn ${btn === appContext.selectedType && styles["active"]}`}
                                onClick = {appContext.onFilterTransactions.bind(null, btn)}
                                > {btn}
                            </Button>
                    })
               }
            </div>

            {
                filteredList.length === 0 ?

                <p className = {styles.unavailable}>No Transactions Available</p> :

                filteredList.map(transaction => (
                    <TransactionItem key = {transaction.id} {...transaction} /> 
                ))
            }

        </article>
       
    )
}

export default Transactions