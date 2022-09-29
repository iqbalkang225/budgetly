import styles from './TransactionItem.module.css'
import { BiPaperPlane, IoFastFoodOutline, BiBarChart } from 'react-icons/bi';


const TransactionItem = ( {title, type, date, price} ) => {

    const dateObject = new Date(date); 

    const day = dateObject.toLocaleString("en-US", { day: "2-digit" });

    const month = dateObject.toLocaleString('en-US', { month: 'short' });

    const year = dateObject.getFullYear();

    const formattedPrice = `${type === "expense" ? "-" : "+"} $${price}`

    let symbol = ""

    if(type === "expense") symbol = "-"

    if(type === "income") symbol = "+"

    return(
        <li className = {styles['transaction-item']}>
            <div className = {styles['icon-box']}>
                <BiPaperPlane className = {styles.icon} />
            </div>

            <div className = {styles.info}>
                <p className = {styles.title}> {title} </p>
                <p className = {styles.date}> {`${month} ${day}, ${year}`} </p>
            </div>

            <p className = {styles.price}> {symbol} ${price}</p>
        </li>
    )
}

export default TransactionItem