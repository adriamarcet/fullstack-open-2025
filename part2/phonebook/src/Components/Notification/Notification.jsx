import './notification.css';

const Notification = ({data, type}) => {
    if(type === 'error') {
        return (
            data !== null && <div className="notification notification--error" aria-live="assertive"><p>{data}</p></div>
        )
    }
    return data !== null && <div className="notification" aria-live="polite"><p>{data}</p></div>
}

export default Notification;