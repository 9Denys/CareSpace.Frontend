function StepCard({ step }) {
    return (
        <div className="home-page__step">
            <span className="home-page__step-number">
                {step.id}
            </span>

            <p>{step.text}</p>
        </div>
    )
}

export default StepCard
