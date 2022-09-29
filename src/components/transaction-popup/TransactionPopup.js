import { Modal, Backdrop } from "../modal/Modal";
import TransactionForm from "../transaction-form/TransactionForm";

const TransactionPopup = (props) => {
    return (
            <Modal>
                <Backdrop onClick = {props.onClick} />
                <TransactionForm onCloseModal = {props.onClick} />
            </Modal>
    )
}

export default TransactionPopup