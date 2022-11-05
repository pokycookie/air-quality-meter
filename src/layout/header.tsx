import pknuLogo from "../assets/pknuLogo.gif";
import pknuCh from "../assets/pknuCh.gif";
import pknuEn from "../assets/pknuEn.gif";
import pknuKr from "../assets/pknuKr.gif";
import "../scss/layout/header.scss";

export default function Header() {
  return (
    <header>
      <div className="logoArea">
        <img className="logo" src={pknuLogo} alt="pknuLogo" />
      </div>
      <div className="logoArea">
        <img className="textKr" src={pknuKr} alt="pknuText" />
        <img className="textEn" src={pknuEn} alt="pknuText" />
      </div>
    </header>
  );
}
