const Notification = ({ message, err }) => {
    if(message !== null) {
        return (
            <div className="event">
                {message}
            </div>
            )
    }else if(err !== null) {
        return (
            <div className="err">
                {err}
            </div>
            )
    }

    return null;
    
}

export default Notification;
