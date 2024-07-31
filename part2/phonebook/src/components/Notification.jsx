const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return <div className={`alert alert--${type}`}>{message}</div>;
};

export default Notification;
