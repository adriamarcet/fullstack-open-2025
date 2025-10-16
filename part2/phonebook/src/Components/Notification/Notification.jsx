import './notification.css';

const Notification = ({message}) => {
    return message !== null && <div className="notification" aria-live="polite"><p>{message}</p></div>
}

export default Notification;