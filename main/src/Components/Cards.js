import "./Cards.css";
const Cards = (props) => {
  return (
    <div className="card">
      <a href={props.link} className="link-to-controller">
        <img className="card-img" src={props.img} alt="c1-logo"></img>
        <h2 className="card-title">{props.title}</h2>
        <p className="card-text">{props.text}</p>
      </a>
    </div>
  );
};

export default Cards;
