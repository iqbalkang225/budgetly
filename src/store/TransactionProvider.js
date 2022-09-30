import { useReducer } from "react"
import TransactionContext from "./transaction-context"

const appInitialState = {
    transactions: [],
    selectedType: 'all',
    transactionTypes: ['income', 'expense', 'investment']
}

const appReducer = (state, action) => {

    switch(action.type) {
        case "ADD_TRANSACTION":

            return {
                ...state,
                transactions: [...state.transactions, action.transaction],
            }

        case "FILTER":
            return {
                ...state,
                selectedType: action.transactionType
            }

        default:
            return state
    }
}

const TransactionProvider = (props) => {

    const [appState, dispatchAction] = useReducer(appReducer, appInitialState)
    console.log(appState)

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
        selectedType: appState.selectedType,
        transactions: appState.transactions,
        onAddTransaction: addTransactionHandler,
        onFilterTransactions: filterTransactions,
        transactionTypes: ['income', 'expense', 'investment']
    }

    return (
        <TransactionContext.Provider value = {transactionsData}>
        {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider