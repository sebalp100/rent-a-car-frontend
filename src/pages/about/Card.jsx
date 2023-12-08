const Card = (props) => {
  return (
    <section className="card-section mb-10">
      <div className="card">
        <div className="flip-card">
          <div className="flip-card__container">
            <div className="card-front">
              <div className="card-front__tp card-front__tp--city">
                <h2 className="card-front__heading text-center">{props.h2}</h2>
                <p className="card-front__text-price"></p>
              </div>

              <div className="card-front__bt">
                <p className="card-front__text-view card-front__text-view--city">
                  View me
                </p>
              </div>
            </div>
            <div className="card-back">
              <video className="video__container" autoPlay muted loop>
                <source
                  className="video__media"
                  src={props.src}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        <div className="inside-page">
          <div className="inside-page__container">
            <h3 className="inside-page__heading inside-page__heading--city">
              {props.h3}
            </h3>
            <p className="inside-page__text">{props.p}</p>
            <a
              href="/dashboard"
              className="inside-page__btn inside-page__btn--city"
            >
              View deals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
