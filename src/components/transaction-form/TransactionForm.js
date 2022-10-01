import { useContext, useState } from 'react'
import TransactionContext from '../../store/transaction-context'
import Button from '../button/Button'
import styles from './TransactionForm.module.css'

const TransactionForm = (props) => {

    const [inputFocus, setInputFocus] = useState(false)
    const [typeFocus, setTypeFocus] = useState(false)
    const [priceFocus, setPriceFocus] = useState(false)

    const appContext = useContext(TransactionContext)

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        category: '',
        date: new Date().toLocaleString(),
        price: '',
        amount: '',
    })

    const changeHandler = (e) => {
        // console.log(formData)

        const {name, value} = e.target

        setFormData((prevState => {
            return {
                ...prevState,
                [name]: name === "price" || name === "amount" ? Number(value) : value,
                id: Math.random()
            }
        }))
    }

    const inputBlurHandler = () => setInputFocus(true)
    const typeBlurHandler = () => setTypeFocus(true)
    const priceBlurHandler = () => setPriceFocus(true)


    const submitHandler = (e) => {
        e.preventDefault()
        
        appContext.onAddTransaction(formData)

        props.onCloseModal()
    }

    const displayCategory = (category) => {
        if (category === 'expense') {
            return (
                <div className = {styles['form-control']}>
                    <label>Category</label>
                    <select 
                        name="category"
                        value = {formData.category}
                        onChange = {changeHandler}
                        >
                        <option value="other">--- Category ---</option>
                        <option value="travel">Travel</option>
                        <option value="shopping">Shopping</option>
                        <option value="food">Food</option>
                        <option value="rent">Rent</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            )
        }

        if (category === 'investment') {
            return (
                <div className = {styles['form-control']}>
                    <label>Asset Name</label>
                    <select 
                        name="category"
                        value = {formData.category}
                        onChange = {changeHandler}
                        required
                        >
                        <option value="">--- Choose Asset---</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                    </select>
                </div>
            )
        }
    }

    return (
        <div className = {styles['transaction-card']}>
            <form onSubmit = {submitHandler}>
                <h2> Add a Transaction </h2>

                <div className = {styles['form-control']}>
                    <label>Type</label>
                    <select 
                        name="type"
                        value = {formData.type}
                        onChange = {changeHandler}
                        required
                        onBlur = {typeBlurHandler}
                        focused = {typeFocus.toString()}
                        >
                        <option value="">--- Transation type ---</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="investment">Investment</option>
                        </select>
                        <span>Please select transaction type</span>
                </div>

               {
                formData.type !== "investment" &&
                <div className = {styles['form-control']}>
                    <label>Title</label>
                    <input
                        type = "text"
                        placeholder = "Enter transaction title"
                        name = "title"
                        value = {formData.title}
                        onChange = {changeHandler}
                        onBlur = {inputBlurHandler}
                        focused = {inputFocus.toString()}
                        required
                    />
                    <span>Please enter the title</span>
                </div>
               }

                { displayCategory(formData.type) }

                <div className = {styles['form-control']}>
                    <label>Date</label>
                    <input
                        type = "date"
                        name = "date"
                        value = {formData.date}
                        onChange = {changeHandler}
                    />
                </div>

                <div className = {styles['form-control']}>
                    <label>{formData.type === "investment" ? "Bought At" : "Price"}</label>
                    <input
                        type = "number"
                        placeholder = "Enter transaction value"
                        name = "price"
                        step = "0.01"
                        value = {formData.price}
                        onChange = {changeHandler}
                        required
                        onBlur = {priceBlurHandler}
                        focused = {priceFocus.toString()}
                    />
                    <span>Please enter the price</span>
                </div>

                {formData.type === "investment" &&
                <div className = {styles['form-control']}>
                    <label>Amount</label>
                    <input
                        type = "number"
                        placeholder = "Enter assest amount"
                        name = "amount"
                        step = "0.01"
                        value = {formData.amount}
                        onChange = {changeHandler}
                        required
                        // onBlur = {priceBlurHandler}
                        // focused = {priceFocus.toString()}
                    />
                    <span>Please enter assest amount</span>
                </div>
                }

                <div className = {styles['form-actions']}>
                   <Button className = "form-btn" > Add Transaction </Button>
                </div>

            </form>
        </div>
    )
}

export default TransactionForm