import { useReducer } from "react"
import TransactionContext from "./transaction-context"

const appInitialState = {
    transactions: [],
    filteredTransactions: []
}

const appReducer = (state, action) => {
    switch(action.type) {
        case "ADD_TRANSACTION":
            console.log(state)
            return {
                ...state,
                transactions: [...state.transactions, action.transaction]
            }

        case "FILTER":

            if(action.transactionType === "all") {
                return {
                ...state,
                filteredTransactions: [...state.transactions]
                }
            }

            const filteredTransactions = state.transactions.filter(transaction => {
                return transaction.type === action.transactionType
            })
            console.log(filteredTransactions)

            return {
                ...state,
                filteredTransactions: [...filteredTransactions]
            }

        default:
            return state
    }
}

const TransactionProvider = (props) => {

    const [appState, dispatchAction] = useReducer(appReducer, appInitialState)

    const addTransactionHandler = (transaction) => {
        dispatchAction(
            {
                type: "ADD_TRANSACTION",
                transaction: transaction
            }
        )
    }

    const filterTransactions = (transactionType) => {
        dispatchAction(
            {
                type: "FILTER",
                transactionType: transactionType
            }
        )
    }

    const transactionsData = {
        transactions: appState.transactions,
        filteredTransactions: appState.filteredTransactions,
        onAddTransaction: addTransactionHandler,
        onFilterTransactions: filterTransactions
    }

    return (
        <TransactionContext.Provider value = {transactionsData}>
        {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider