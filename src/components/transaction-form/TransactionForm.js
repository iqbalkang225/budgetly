import { useContext, useState } from 'react'
import TransactionContext from '../../store/transaction-context'
import Button from '../button/Button'
import styles from './TransactionForm.module.css'

const TransactionForm = (props) => {

    const [isFormValid, setIsFormValid] = useState(null)

    const appContext = useContext(TransactionContext)

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        category: '',
        date: new Date().toLocaleString(),
        price: '',

    })

    const changeHandler = (e) => {
        // console.log(formData)
        setIsFormValid(true)

        const {name, value} = e.target

        setFormData((prevState => {
            return {
                ...prevState,
                [name]: name === "price" ? Number(value) : value,
                id: Math.random()
            }
        }))
    }

    const validateForm = () => {
        if(!formData.title || !formData.price || !formData.type) setIsFormValid(false)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        validateForm()

        if(!isFormValid) return
        
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
                        <option value="">--- Category ---</option>
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
                    <label>Category</label>
                    <select 
                        name="category"
                        value = {formData.category}
                        onChange = {changeHandler}
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
                    <label>Title</label>
                    <input
                        type = "text"
                        placeholder = "Enter transaction title"
                        name = "title"
                        value = {formData.title}
                        onChange = {changeHandler}
                    />
                </div>

                <div className = {styles['form-control']}>
                    <label>Type</label>
                    <select 
                        name="type"
                        value = {formData.type}
                        onChange = {changeHandler}
                        >
                        <option value="">--- Transation type ---</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="investment">Investment</option>
                        </select>
                </div>

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
                    <label>Price</label>
                    <input
                        type = "number"
                        placeholder = "Enter transaction value"
                        name = "price"
                        step = "0.01"
                        value = {formData.price}
                        onChange = {changeHandler}
                    />
                </div>

                <div className = {styles['form-actions']}>
                   <Button className = "form-btn" > Add Transaction </Button>
                </div>

            </form>
        </div>
    )
}

export default TransactionForm