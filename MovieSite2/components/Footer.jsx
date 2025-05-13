import { Link } from "react-router-dom";
import "./Footer.css";

function FooterView() {
  return (
    <div>
      <div className="Footer1">
        <div className="FooterBoldBox About">About</div>
        <div className="FooterBox WhoWeAre">Who are we?</div>
        <div className="FooterBox Hiring">We're hiring!</div>

        <div className="FooterBoldBox Help">Help</div>
        <div className="FooterBox Payments">Payments</div>
        <div className="FooterBox Delivery">Delivery</div>
        <div className="FooterBox ContactUs">Contact us</div>

        <div className="FooterBoldBox LawOrder">Law</div>
        <div className="FooterBox TermsNService">Terms N service</div>
        <div className="FooterBox Cookies">Cookies</div>

        <div className="FooterBoldBox Media">Media</div>
        <div className="FooterBox Youtube">Youtube</div>
        <div className="FooterBox Instagram">Instagram</div>
      </div>
    </div>
  );
}

export default FooterView;