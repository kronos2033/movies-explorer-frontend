import './Popup.css'
function Popup(props) {

function handleClosePopup () {
    props.setOpen(false)
 }
    return (
        <div className={`popup ${props.open?'popup_visible': '' }`} tabIndex={0}>
            <div className=" popup__window">
                <button
                    type="button"
                    className="popup__close"
                    onClick={handleClosePopup}
                    />
                <h2 className="popup__subtitle">{props.text}</h2>
            </div>
        </div>
    )
}

export default Popup