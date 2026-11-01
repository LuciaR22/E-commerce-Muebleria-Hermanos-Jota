import "./ApiState.css";

function ApiState({ status, title, message, actions = null, className = "" }) {
    const rootClassName = ["api-state", `api-state--${status}`, className].filter(Boolean).join(" ");

    if (status === "loading" || status === "refreshing") {
        return (
            <div className={rootClassName} role="status" aria-live="polite">
                <div className="api-state__spinner" aria-hidden="true" />
                <div className="api-state__body">
                    <h3 className="api-state__title">{title}</h3>
                    <p className="api-state__text">{message}</p>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className={rootClassName} role="alert">
                <div className="api-state__icon" aria-hidden="true">
                    !
                </div>
                <div className="api-state__body">
                    <h3 className="api-state__title">{title}</h3>
                    <p className="api-state__text">{message}</p>
                    {actions ? <div className="api-state__actions">{actions}</div> : null}
                </div>
            </div>
        );
    }

    return null;
}

export default ApiState;
