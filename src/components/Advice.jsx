import { useEffect, useState } from "react";
import Divider from "../images/pattern-divider-desktop.svg";
import Dice from "../images/icon-dice.svg";
import Loading from "./Loading";

const Advice = () => {
  const initialAdvice = {
    id: 69,
    advice:
      "If you're watching this message, its is because there is a problem accessing to the new advice, so, you're watching the funny number 69 😈😈😈 (sarcasm btw)",
  };

  const [advice, setAdvice] = useState(initialAdvice);
  const [loading, setLoading] = useState(false);
  const [newAdvice, setNewAdvice] = useState(false);

  useEffect(() => {
    fetchData();
  }, [newAdvice]);

  const fetchData = async () => {
    setLoading(true);

    const url = "https://api.adviceslip.com/advice";

    try {
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
    } catch (error) {
      console.error("Problem with your connection to internet");
      setLoading(false);
    }
  };

  return (
    <div className="advice-card">
      <h1 className="advice-id">Advice #{advice.id}</h1>
      {loading ? (
        <Loading />
      ) : (
        <p className="advice-content">"{advice.advice}"</p>
      )}
      <div className="divider">
        <hr className="right" />
        <img src={Divider} alt="divisor" />
        <hr className="left" />
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
