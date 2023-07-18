import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from './list';
import { useMediaQuery } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import '../App.scss';

function Search(): JSX.Element {
  const [inputText, setInputText] = useState<string>('');
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery('(max-width: 480px)');
  const [textFieldVisible, setTextFieldVisible] = useState<boolean>(!isSmallScreen);

  const handleResetInputText = (): void => {
    setInputText('');
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const lowerCase: string = e.target.value.toLowerCase();
    setInputText(lowerCase);
    setListVisible(lowerCase.length > 0 && inputFocused);
  };

  const listStyle = {
    display: listVisible ? 'block' : 'none',
  };

  const toggleTextFieldVisibility = (): void => {
    setTextFieldVisible(!textFieldVisible);
  };

  const textFieldStyle = {
    display: textFieldVisible && inputText.length <= 0 ? 'none' : 'block',
  };
  const searchStyle = {
    display: isSmallScreen ? (textFieldVisible ? 'block' : 'none') : 'block',
  };
  
  return (
    <div className="header-search">
      {isSmallScreen ? (
        <button onClick={toggleTextFieldVisibility}>
          <FaSearch />
        </button>
      ) : null}
      <div className="search" style={searchStyle}>
        <div style={{ position: 'relative' }}>
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            value={inputText}
            variant="outlined"
            fullWidth
            placeholder="검색"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            InputProps={{
              inputProps: {
                autoComplete: 'off',
              },
            }}
          />
          <List input={inputText} handleResetInputText={handleResetInputText} style={{ ...listStyle, display: inputText.length > 0 ? 'block' : 'none' }} />
        </div>
      </div>
    </div>
  );
}

export default Search;