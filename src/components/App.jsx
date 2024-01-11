import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';

export const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleChange = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      default:
        break;
    }
  };

  const countPositiveFeedback = () => {
    const total = countTotalFeedback();
    if (total > 0) {
      return Math.round((good / total) * 100);
    } else {
      return 0;
    }
  };
  const countTotalFeedback = () => {
    return good + bad + neutral;
  };

  const feedbackOptions = ['good', 'bad', 'neutral'];

  return (
    <div>
      <Section title="leave your feedback">
        <FeedbackOptions funcRate={handleChange} options={feedbackOptions} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() < 1 ? (
          <p>Nothing</p>
        ) : (
          <Statistics
            good={good}
            bad={bad}
            total={countTotalFeedback()}
            neutral={neutral}
            positive={countPositiveFeedback()}
          />
        )}
      </Section>
    </div>
  );
};
