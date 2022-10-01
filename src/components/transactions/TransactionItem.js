import styles from './TransactionItem.module.css'
import { BiPaperPlane, BiBarChart, BiDollar } from 'react-icons/bi';
import { IoFastFoodOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineOtherHouses } from "react-icons/md";
import 'animate.css';
import {useContext} from 'react'
import TransactionContext from '../../store/transaction-context'

const TransactionItem = ( {title, type, category, date, price, amount} ) => {

    const appContext = useContext(TransactionContext)

    const renderDate = () => {
        const dateObject = new Date(date.replace(/-/g, '\/')); 
        const day = dateObject.toLocaleString("en-US", { day: "2-digit" });
        const month = dateObject.toLocaleString('en-US', { month: 'short' });
        const year = dateObject.getFullYear();

        return `${month} ${day}, ${year}`

    }

    const symbolType = () => {
        let symbol = ""
        if(type === "expense") symbol = "-"
        if(type === "income") symbol = "+"
        if(type === "investment") symbol =  <span>Bought At</span>
        return symbol
    }

    const iconType = () => {
        let icon = <RiBillLine />
        if(type === "income") icon = <BiDollar />
        if(category === 'shopping') icon = <CgShoppingCart />
        if(category === 'food') icon = <IoFastFoodOutline />
        if(category === 'travel') icon = <BiPaperPlane />
        if(category === "bitcoin" || category === "ethereum") icon = <BiBarChart />
        if(category === 'rent') icon = <MdOutlineOtherHouses />
        return icon
    }

    const currentAssetPrice = category === 'bitcoin' ? appContext.currentBitcoinPrice : appContext.currentEthereumPrice
    const spanClassName = currentAssetPrice > price ? styles.profit : styles.loss

    return(
        <li className = {`animate__animated animate__flipInX ${styles['transaction-item']}`}>
            <div className = {styles['icon-box']}>
                {iconType()}
            </div>

            <div className = {styles.info}>
                <p className = {styles.title}> 
                    {type === "investment" ? category : title} 
                    {
                        type === 'investment' && <span className = {styles['asset-amount']} >x {amount}</span>
                    }
                </p>
                <p className = {styles.date}> {renderDate()} </p>
            </div>

            <p className = {styles.price}> {symbolType()}${price}</p>

            {
                type === "investment" &&
                <p className = {styles.current}> Current Price <span className = {spanClassName}> ${currentAssetPrice.toFixed(2)} </span> </p>
            }
        </li>
    )
}

export default TransactionItem