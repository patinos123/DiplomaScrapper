import React from 'react';
import styled from 'styled-components';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import 'rc-slider/assets/index.css';
import { theme } from '../../../theme/mainTheme';

const FilterBarWrapper = styled.div`
  position: relative;
  height: 17.5vh;
  background: ${theme.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilterBarRowOne = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 0 15px 0 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
  background: ${({ theme, active, rent, sell, swap }) =>
    active && rent
      ? theme.orange
      : active && sell
      ? theme.green
      : active && swap
      ? theme.blue
      : 'initial'};

  &:hover {
    background: ${({ theme, rent, sell, swap }) =>
      rent ? theme.orange : sell ? theme.green : swap ? theme.blue : theme.orange};
  }
  transition: background 1s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const FilterBarRowTwo = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;

const SliderWithTooltip = createSliderWithTooltip(Slider);

const StyledSliderWithTooltip = styled(SliderWithTooltip)`
  width: 10% !important;
  margin: 0 0 0 20px;
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  distanceFormater(v) {
    return `Odległość: ${v} km`;
  }

  render() {
    return (
      <FilterBarWrapper>
        <FilterBarRowOne>
          <StyledButton
            swap
            dark
            onClick={() => this.props.filterByType('All')}
            active={this.props.currentActiveType === 'All'}
          >
            All
          </StyledButton>
          <StyledButton
            rent
            dark
            onClick={() => this.props.filterByType('Mieszkania » Wynajem')}
            active={this.props.currentActiveType === 'Mieszkania » Wynajem'}
          >
            Wynajem
          </StyledButton>
          <StyledButton
            sell
            dark
            onClick={() => this.props.filterByType('Mieszkania » Sprzedaż')}
            active={this.props.currentActiveType === 'Mieszkania » Sprzedaż'}
          >
            Sprzedaż
          </StyledButton>
          <StyledButton
            swap
            dark
            onClick={() => this.props.filterByType('Mieszkania » Zamiana')}
            active={this.props.currentActiveType === 'Mieszkania » Zamiana'}
          >
            Zamiana
          </StyledButton>
        </FilterBarRowOne>
        <FilterBarRowTwo>
          <Input ref="searchInput" placeholder="Search" search />
          <StyledSliderWithTooltip
            tipFormatter={this.distanceFormater}
            tipProps={{ overlayClassName: 'foo' }}
            min={1}
            max={20}
            step={0.5}
            defaultValue={2}
            trackStyle={{ backgroundColor: theme.blue, height: 10 }}
            handleStyle={{
              border: 0,
              height: 24,
              width: 24,
              marginTop: -7,
              backgroundColor: theme.blue,
            }}
            railStyle={{ backgroundColor: '#dfe0df', height: 10 }}
          />
        </FilterBarRowTwo>
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;