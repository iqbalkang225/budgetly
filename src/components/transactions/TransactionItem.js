import styles from './TransactionItem.module.css'
import { BiPaperPlane, BiBarChart, BiDollar } from 'react-icons/bi';
import { IoFastFoodOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineOtherHouses } from "react-icons/md";
import 'animate.css';

const TransactionItem = ( {title, type, category, date, price} ) => {

    const dateObject = new Date(date.replace(/-/g, '\/')); 
    const day = dateObject.toLocaleString("en-US", { day: "2-digit" });
    const month = dateObject.toLocaleString('en-US', { month: 'short' });
    const year = dateObject.getFullYear();

    const symbolType = () => {
        let symbol = ""
        if(type === "expense") symbol = "-"
        if(type === "income") symbol = "+"
        if(type === "investment") symbol =  <span>Investment</span>
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

    return(
        <li className = {`animate__animated animate__flipInX ${styles['transaction-item']}`}>
            <div className = {styles['icon-box']}>
                {iconType()}
            </div>

            <div className = {styles.info}>
                <p className = {styles.title}> {title} </p>
                <p className = {styles.date}> {`${month} ${day}, ${year}`} </p>
            </div>

            <p className = {styles.price}> {symbolType()}${price}</p>
        </li>
    )
}

export default TransactionItem