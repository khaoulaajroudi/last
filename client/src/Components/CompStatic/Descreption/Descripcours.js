import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./Descripcours.css";
import { editcours, getcours } from "../../../JS/Actions/Cours";
import { current } from "../../../JS/Actions/User";
import axios from "axios";

function Descripcours() {
  const location = useLocation();
  const { cours } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [participant, setparticipant] = useState();
  const [tab, settab] = useState(0);
  const users = useSelector((state) => state.userReducer.user);
  const isAuth = localStorage.getItem("token");
  const [cour, setcour] = useState({});
  useEffect(async () => {
    await axios.get(`/cours/${cours._id}`).then((res) => setcour(res.data));
  }, []);

  const handleParticipate = () => {
    if (!isAuth) {
      navigate("/sign");
    }
    if (cours.participants.length < cours.nbrPartic) {
      //dispatch participate
      dispatch(
        editcours({
          id: cours._id,
          participant: { name: "khaoula", _id: "123456" },
        })
      );
      dispatch(getcours());
    } else {
      //navigate to sign in
      <h1> n'ya plus du place</h1>;
    }
  };
  return (
    <div>
      <Navbar />
      <div class="containercours">
        <section class="cards1">
          <article class="cardcours card-1">
            <div class="cards">
              <div class="photo">
                <img src={cours.photo} />
              </div>
              <div class="description">
                <h2>{cours.nameCours}</h2>
                <h2>{cours.participants.length}</h2>

                {cours.isFree == "free" ? (
                  <h1 class="pricecoursfree">{cours.isFree}</h1>
                ) : (
                  <h1 class="pricecoursprice">{cours.price}DT</h1>
                )}
                <h4>{cours.nbrPartic} participants</h4>
                <p>{cours.description}</p>
                <button onClick={handleParticipate}>Participer</button>
              </div>
            </div>
          </article>
          <article class="cardcours card-2">
            <div className="hautbutn">
              <button onClick={() => settab(1)}>Chapters</button>
              <button onClick={() => settab(2)}>Overview</button>
            </div>
            {tab == 1 ? (
              <div>
                <div class="prize">
                  <h3>
                    <strong>Chapters</strong>
                  </h3>
                </div>
                <div className="listchapter">
                  {cours.modules.map((el) => (
                    <div>
                      <h4>
                        chapter : <span>{el.name}</span>
                      </h4>
                      <embed
                        src={el.file}
                        type="application/pdf"
                        width="600px"
                        height="500px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {tab == 2 ? (
              <div>
                <div className="listchapter">
                  <h4>
                    Certifier : <span>{cours.certifier}</span>
                  </h4>
                  <h4>
                    Instrocteur : <span>{cours.enseignant}</span>
                  </h4>
                  <h4>
                    durées : <span>{cours.cycle}</span>
                  </h4>
                </div>
              </div>
            ) : null}
          </article>
          {/* <article class="cardcours card-3">
            <h2>
              {" "}
              <small></small>{" "}
            </h2>
          </article> */}
        </section>
      </div>
    </div>
  );
}

export default Descripcours;
