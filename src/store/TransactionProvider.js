import { useEffect, useReducer } from "react"
import TransactionContext from "./transaction-context"

const appInitialState = {
    transactions: [],
    selectedType: 'all',
    transactionTypes: ['income', 'expense', 'investment'],
    currentBitcoinPrice: '',
    currentEthereumPrice: ''
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

        case "ASSET_PRICE":
            console.log(action)
            return {
                ...state,
                currentBitcoinPrice: action.currentbitcoinPrice ? action.currentbitcoinPrice : state.currentBitcoinPrice,
                currentEthereumPrice: action.currentethereumPrice ? action.currentethereumPrice : state.currentEthereumPrice
            }

        default:
            return state
    }
}

const TransactionProvider = (props) => {

    const fetchCurrAssetPrice = async (assestName) => {
        try {
            const response = await fetch(`https://data.messari.io/api/v1/assets/${assestName}/metrics`)

            if(!response.ok) throw new Error("Something went wrong")

            const data = await response.json()
            console.log(data)

            const currentAssetPrice = data.data.market_data.price_usd

            dispatchAction(
                {
                    type: "ASSET_PRICE",
                    [`current${assestName}Price`]: currentAssetPrice

                }
            )         
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCurrAssetPrice("bitcoin")
        fetchCurrAssetPrice("ethereum")
    }, [])


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
        transactionTypes: ['income', 'expense', 'investment'],
        currentBitcoinPrice: appState.currentBitcoinPrice,
        currentEthereumPrice: appState.currentEthereumPrice
    }

    return (
        <TransactionContext.Provider value = {transactionsData}>
        {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider