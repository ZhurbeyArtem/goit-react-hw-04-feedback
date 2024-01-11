import React, { Component } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleChange = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countPositiveFeedback = () => {
    const total = this.countTotalFeedback();
    if (total > 0) {
      return Math.round((this.state.good / total) * 100);
    } else {
      return 0;
    }
  };
  countTotalFeedback = () => {
    const valuesArray = Object.values(this.state);
    return valuesArray.reduce((a, b) => a + b);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const feedbackOptions = Object.keys(this.state);

    return (
      <div>
        <Section title="leave your feedback">
          <FeedbackOptions
            funcRate={this.handleChange}
            options={feedbackOptions}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() < 1 ? (
            <p>Nothing</p>
          ) : (
            <Statistics
              good={good}
              bad={bad}
              total={this.countTotalFeedback()}
              neutral={neutral}
              positive={this.countPositiveFeedback(this.countTotalFeedback())}
            />
          )}
        </Section>
      </div>
    );
  }
}
