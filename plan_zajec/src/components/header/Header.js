import './Header.scss';

const Header = (props) => {
    return (
        <div className="App-header">
            <div className="logo">
                <p>| Technischools |</p>
            </div>
            <div className="info">
                <p className="info--1">Dzwonek szkolny</p>
                <p className="info--2">Aplikacja uczniowska</p>
            </div>
        </div>
    );
};

export default Header;