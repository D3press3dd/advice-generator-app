import { useEffect, useState } from "react";
import Divider from "../images/pattern-divider-desktop.svg";
import Dice from "../images/icon-dice.svg";
import Loading from "./Loading";

const Advice = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAdvice, setNewAdvice] = useState(false);

  useEffect(() => {
    fetchData();
  }, [newAdvice]);

  const fetchData = async () => {
    setLoading(true);
    const url = "https://api.adviceslip.com/advice";
    const data = await fetch(url);
    if (data.ok) {
      const response = await data.json();

      setAdvice(response.slip);
      setLoading(false);
    } else {
      throw new Error(
        ` ¡Ups!, there is a problem with the response in the api, error: ${data.status} `
      );
    }
  };

  return (
    <div className="advice-card">
      <p className="advice-id">Advice #{advice.id}</p>
      {loading ? (
        <Loading />
      ) : (
        <p className="advice-content">"{advice.advice}"</p>
      )}
      <div className="divider">
        <img src={Divider} alt="divisor" />
      </div>

      <div className="dice-container">
        <img
          className="dice"
          src={Dice}
          alt="a simple dice"
          onClick={() => setNewAdvice(!newAdvice)}
        />
      </div>
    </div>
  );
};

export default Advice;
